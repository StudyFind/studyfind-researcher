const functions = require("firebase-functions");

module.exports = ({ admin }) => async (req, res) => {
  try {
    res.set("Access-Control-Allow-Origin", "*");

    const { idToken } = req.query;
    if (!idToken) return res.json({ error: "parameter idToken needs to be defined" });

    const auth = admin.auth();

    const user = await auth.verifyIdToken(idToken);

    functions.logger.debug("idToken:", idToken);
    functions.logger.debug("user:", user);
    functions.logger.debug("uid:", user.uid);

    await auth.setCustomUserClaims(user.uid, { researcher: true });

    functions.logger.info("researcher claim successfully set");
    return res.json({ message: "researcher claim successfully set" });
  } catch (error) {
    const errorMessage = `researcher claim could not be set: ${error}`;
    functions.logger.error(errorMessage);
    return res.json({ error: errorMessage });
  }
};
