// src/notification-triggers.js
const { logger } = require("firebase-functions");
const defaults = require("./utils/make-notification");


module.exports.onCreateStudy = ({ admin }) => async (snapshot, context) => {
    const firestore = admin.firestore();
    const study = snapshot.data();

    return firestore
        .collection("researchers").doc(study.researcher.id)
        .collection("notifications").add({
            ...defaults(admin),
            title: "New Study Created",
            description: `A new study with id "${study.nctID}" has been created.`,
            type: context.eventType,
        });
};

module.exports.onDeleteStudy = ({ admin }) => async (snapshot, context) => {
    const firestore = admin.firestore();
    const study = snapshot.data();

    return firestore
        .collection("researchers").doc(study.researcher.id)
        .collection("notifications").add({
            ...defaults(admin),
            title: "Study Deleted",
            description: `Your study with id "${study.nctID}" has been deleted.`,
            type: context.eventType,
        });
};

module.exports.onNewParticipant = ({ admin }) => async (snapshot, context) => {
    const firestore = admin.firestore();
    const { studyID } = context.params;

    const studySnapshot = await firestore
        .collection("studies").doc(studyID).get();
    const researcher = studySnapshot.get("researcher");
    const fakeName = snapshot.get("fakeName");
    return firestore
        .collection("researchers").doc(researcher.id)
        .collection("notifications").add({
            ...defaults(admin),
            title: "New Participant",
            description: `Your study with id ${studyID} got a new participant, ${fakeName}.`,
            type: context.eventType,
        });
};


module.exports.onCreateResearcherAccount = ({ admin }) => async (snapshot, context) => {
    const firestore = admin.firestore();
    const { researcherID } = context.params;

    return firestore
        .collection("researchers").doc(researcherID)
        .collection("notifications").add({
            ...defaults(admin),
            title: "Account Created",
            description: "This is your first notification. Your account has been created!",
            type: context.eventType,
        });
};