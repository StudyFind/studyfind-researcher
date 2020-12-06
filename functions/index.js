const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


const context = { admin };

// note that switch func contains all functions
const switchFunc = require('./src/switch-func');
exports.studies = functions.https.onRequest(switchFunc(context))
// const makeStudy = require('./src/make-study');
// exports.makeStudy = functions.https.onRequest(makeStudy(context));

