const verifyIdToken = require('./verify-id-token')
const getUser = require('./get-user')
const addFirestoreEntry = require('./add-firestore-entry')

module.exports = {
	verifyIdToken,
	getUser,
	addFirestoreEntry,
}
