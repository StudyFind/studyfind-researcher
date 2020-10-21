const axios = require('axios');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// Take the NCTID text parameter passed to this HTTP endpoint and use flask api to scrape
// its data, create a default unpublished study, and return the data
exports.getStudy = functions.https.onRequest(async (req, res) => {
    // Grab the NCTID parameter.
    const id = req.query.NCTID
    if (!id) {
        res.json({ error: 'parameter NCTID needs to be defined' })
    }
    // Grab the user idToken parameter
    const idToken = req.query.idToken
    if (!idToken) {
        res.json({ error: 'parameter idToken needs to be defined' })
    }

    functions.logger.log(`[getStudy] scraping NCTID '${id}'`)
    Promise.all([ // simultaneously query flask scraper and auth user
        axios.get(`https://flask-fire-27eclhhcra-uc.a.run.app/autoFillStudy?nctID=${id}`)
            .then(resp => { // check for fail in flask api
                const d = resp.data

                if (d.status == 'failure') {
                    throw Error(`parameter NCTID '${id}' is likely invalid`)
                }
                delete d.status

                return { error: null, ...d['study'] }
            }),
        admin.auth().verifyIdToken(idToken)
            .then(decodedToken => { // convert token to user data
                return admin.auth().getUser(decodedToken.uid)
            })
            .catch(err => {
                res.status(401)
                throw Error(`parameter idToken '${idToken}' is not a valid firebase user token`)
            })
    ])
        .then(([data, user]) => { // create default listing and check emails
            if (data.contactEmail != user.email) {
                res.status(401)
                throw Error(`user email '${user.email}' does not match study contact email '${data.contactEmail}', and ownership cannot be verified`)
            }
            return data
        })
        .then(data => res.json(data)) // respond
        .catch(err => {
            functions.logger.log(`[getStudy] failed: ${err}`)
            res.json({ error: err.toString() })
        })


    // // Push the new message into Cloud Firestore using the Firebase Admin SDK.
    // const writeResult = await admin.firestore().collection('messages').add({original: original});
    // // Send back a message that we've succesfully written the message
    // res.json({result: `Message with ID: ${writeResult.id} added.`});
});