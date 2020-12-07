const addFirestoreEntry = require("./firebase/add-firestore-entry");

module.exports = ({ admin }) => async (context) => {
    const firestore = admin.firestore();

    addFirestoreEntry({ firestore, collection: 'notifications', data: { done: true } });
}