// utils/add-firestore-entry.js

module.exports = async (firestore, collection, data) =>
    firestore.collection(collection).add(data)