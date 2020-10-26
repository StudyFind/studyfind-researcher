// utils/add-firestore-entry.js

module.exports = async (firestore, collection, data) {
    return firestore.collection(collection).add(data)
}