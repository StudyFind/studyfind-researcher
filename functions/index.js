const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const context = { admin };

// ***** Http Functions *****

// note that switch func contains all http functions
const switchFunc = require("./src/switch-func");
exports.studies = functions.https.onRequest(switchFunc(context));
// const makeStudy = require('./src/make-study');
// exports.makeStudy = functions.https.onRequest(makeStudy(context));

// ***** Cron Functions *****
// note, these will not work in emulator. Automatic testing is paramount

const remindersRunner = require("./src/reminders-runner.js");
exports.remindersRunner = functions.pubsub.schedule("*/30 * * * *").onRun(remindersRunner(context));

// ***** Cloud Trigger Functions ******

const { onCreateStudy, onDeleteStudy, onNewParticipant } = require("./src/notification-triggers.js");
exports.createStudyTrigger = functions.firestore.document("studies/{studyID}")
    .onCreate(onCreateStudy(context));
exports.deleteStudyTrigger = functions.firestore.document("studies/{studyID}")
    .onDelete(onDeleteStudy(context));

exports.newParticipantTrigger = functions.firestore.document("studies/{studyID}/participants/{participantID}")
    .onCreate(onNewParticipant(context))