// utils/verify-id-token.js

module.exports = async (admin, idToken) => {
	if (!idToken) {
		return null
	}
	return admin.verifyIdToken(idToken)
}
