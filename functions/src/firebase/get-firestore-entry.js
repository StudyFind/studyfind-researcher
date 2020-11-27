// utils/get-firestore-entry.js

module.exports = async ({ firestore, collection, document }) => {
    return firestore.collection(collection).doc(document).get();
}