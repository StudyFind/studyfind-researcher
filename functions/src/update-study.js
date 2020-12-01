const verifyIdToken = require("./firebase/verify-id-token");
const updateFirestoreEntry = require("./firebase/update-firestore-entry");

const fetchStudy = require("./utils/fetch-study");
const cleanStudy = require("./utils/clean-study");

// updates existing study in firestore
async function updateFirestore(firestore, nctID, study) {
    const updateData = (({
        published,
        activated,
        nctID,
        title,
        description,
        researcher,
        ...s
    }) => s)(study)
    await updateFirestoreEntry({
        firestore,
        collection: "studies",
        document: nctID,
        data: updateData
    });
    return study
}

// Take the nctID text parameter and rescrape associated
// study while preserving some persistant fields
module.exports = ({ admin }) => async (req, res) => {
    const { nctID, idToken } = req.query;
    const auth = admin.auth();
    const firestore = admin.firestore();

    if (!nctID) return res.json({ error: "parameter nctID needs to be defined" });
    if (!idToken) return res.json({ error: "parameter idToken needs to be defined" });

    return Promise.all([fetchStudy(nctID), verifyIdToken(auth, idToken)])
        .then(([data, token]) => data)
        .then((data) => cleanStudy(data))
        .then((study) => updateFirestore(firestore, nctID, study))
        .then((study) => res.json({ study, nctID, error: null }))
        .catch((err) => res.json({ study: null, error: err.toString() }));
}