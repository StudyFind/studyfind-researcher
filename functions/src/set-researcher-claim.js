const getUserByToken = require("./firebase/get-user-by-token");
const functions = require("firebase-functions");

module.exports = ({ admin }) => async (req, res) => {
  try {
    const { idToken } = req.query;
    if (!idToken) return res.json({ error: "parameter idToken needs to be defined" });

    const auth = admin.auth();
    const { uid } = getUserByToken(auth, idToken);
    auth.setCustomUserClaims(uid, { researcher: true });

    return res.json({ message: "researcher claim successfully set" });
  } catch (error) {
    const errorMessage = `researcher claim could not be set: ${error}`;
    functions.logger.error(errorMessage);
    return res.json({ error: errorMessage });
  }
};
