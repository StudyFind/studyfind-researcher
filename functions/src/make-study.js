const functions = require('firebase-functions');
const axios = require('axios');

const verifyIdToken = require('./utils/verify-id-token')
const getUser = require('./utils/get-user')
const addFirestoreEntry = require('./utils/add-firestore-entry')

// Take the NCTID text parameter passed to this HTTP endpoint and use flask api to scrape
// its data, create a default unpublished study, and return the data
module.exports = ({ admin }) => async (req, res) => {
    // Grab the NCTID parameter.
    const id = req.query.NCTID
    if (!id) {
        return res.json({ error: 'parameter NCTID needs to be defined' })
    }
    // Grab the user idToken parameter
    const idToken = req.query.idToken
    if (!idToken) {
        return res.json({ error: 'parameter idToken needs to be defined' })
    }

    const auth = admin.auth()
    return Promise.all([ // simultaneously query flask scraper and auth user
        axios.get(`https://flask-fire-27eclhhcra-uc.a.run.app/autoFillStudy?nctID=${id}`)
            // check for fail in flask api
            .then(resp => {
                const d = resp.data

                if (!d || d.status === 'failure') {
                    throw Error(`parameter NCTID '${id}' is likely invalid`)
                }
                delete d.status

                return d['study']
            }),
        verifyIdToken(admin, idToken)
            // convert token to user data
            .then(decodedToken => {
                return getUser(auth, decodedToken.uid)
            })
            .catch(err => {
                res.status(401)
                throw Error(`parameter idToken '${idToken}' is not a valid firebase user token: ${err}`)
            })
    ])
        // check emails for match
        .then(async ([data, user]) => {
            if (data.contactEmail != user.email) {
                res.status(401)
                throw Error(`user email '${user.email}' does not match study contact email '${data.contactEmail}'; ownership cannot be verified`)
            }
            return [data, user]
        })
        // create questions from study
        .then(async ([data, user]) => {

            let inclusion = true
            data.questions = data.additionalCriteria
                .split('\n')
                .map(i => {
                    if (i == '') return null
                    let norm = i.toLowerCase()
                    if (norm.includes('exclusion')) {
                        inclusion = false
                        return null
                    }
                    if (norm.includes('criteria')) return null
                    if (norm.includes('following')) return null

                    return {
                        type: inclusion ? 'Inclusion' : 'Exclusion',
                        prompt: i
                    }

                })
                .filter(i => i != null)

            return [data, user]
        })
        // write data to firestore, create final respond
        .then(async ([data, user]) => {
            const writeResult = await addFirestoreEntry(admin.firestore(), 'studies', dataToStudyEntry(data, user))
            return { data, entryId: writeResult._path.segments.pop(), error: null }
        })
        // respond
        .then(data => res.json(data))
        // catch all errors
        .catch(err => {
            // functions.logger.log(`[getStudy] failed: ${err}`)
            res.json({ error: err.toString() })
        })
}


// returns default entry from given data/user combo. Designed to be adjustable
// @param data <obj> - data object scraped from nct website by flask app
// @param user <obj> - firebase user object authoring this study
function dataToStudyEntry(data, user) {
    return { ...data, userId: user.uid, published: false }
}
