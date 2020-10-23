const functions = require('firebase-functions');
const axios = require('axios');


// Take the NCTID text parameter passed to this HTTP endpoint and use flask api to scrape
// its data, create a default unpublished study, and return the data
module.exports = ({ admin }) => async (req, res) => {
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
    return Promise.all([ // simultaneously query flask scraper and auth user
        axios.get(`https://flask-fire-27eclhhcra-uc.a.run.app/autoFillStudy?nctID=${id}`)
            .then(resp => { // check for fail in flask api
                const d = resp.data

                if (d.status == 'failure') {
                    throw Error(`parameter NCTID '${id}' is likely invalid`)
                }
                delete d.status

                return d['study']
            }),
        admin.auth().verifyIdToken(idToken)
            .then(decodedToken => { // convert token to user data
                return admin.auth().getUser(decodedToken.uid)
            })
            .catch(err => {
                // TO TEST:
                // return { email: 'jdipersi@wustl.edu', uid: 'aaahahaa' }
                res.status(401)
                throw Error(`parameter idToken '${idToken}' is not a valid firebase user token`)
            })
    ])
        .then(async ([data, user]) => { // create default listing and check emails
            if (data.contactEmail != user.email) {
                res.status(401)
                throw Error(`user email '${user.email}' does not match study contact email '${data.contactEmail}'; ownership cannot be verified`)
            }
            // note -- write default value here!
            const writeResult = await admin.firestore().collection('studies').add(dataToStudyEntry(data, user))
            return { data, entryId: writeResult._path.segments.pop(), error: null }
        })
        .then(data => res.json(data)) // respond
        .catch(err => {
            functions.logger.log(`[getStudy] failed: ${err}`)
            res.json({ error: err.toString() })
        })
}


// returns default entry from given data/user combo. Very adjustable
// @param data <obj> - data object scraped from nct website by flask app
// @param user <obj> - firebase user object authoring this study
function dataToStudyEntry(data, user) {
    return { ...data, userId: user.uid, published: false }
}