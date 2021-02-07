const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const context = { admin };

// ***** Http Functions *****

// runs when a researcher account is created
// adds all studies on clinicaltrials.gov that contain the user's email to firestore
const welcomeAccount = require("./src/welcome-account");
exports.welcomeAccount = functions.https.onRequest(welcomeAccount(context));

// note that switch func contains all http functions
const switchFunc = require("./src/switch-func");
exports.studies = functions.https.onRequest(switchFunc(context));
// const makeStudy = require('./src/make-study');
// exports.makeStudy = functions.https.onRequest(makeStudy(context));

// ***** Cron Functions *****
// note, these will not work in emulator. Automatic testing is paramount

const remindersRunner = require("./src/reminders-runner.js");
exports.remindersRunner = functions.pubsub.schedule("*/30 * * * *").onRun(remindersRunner(context));
