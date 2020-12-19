const { logger, firestore } = require("firebase-functions");

/**
 * convert timestamp into 30-min-interval offset from beginning of week
 * ((now % 1000*60*60*24*7) / 1000*60*30) * 1000*60*30
 * ((now % week in milliseconds) / 30 min standard) * 30 min standard
 * @param {number} now current timestamp
 */
const getCurrentOffset = (now) => Math.floor((now % 604800000) / 1800000) * 1800000;

/**
 * Perform a specific async action for each study existing in firebase
 * @param {function} fn action to perform with each study. Will be passed a firestore snapshot
 * @param {firestore} firestore firestore ref
 */
const forEachStudy = async (fn, firestore) => {
    const studiesData = await firestore.collection("studies").get();
    if (studiesData.empty) return [];
    const studies = [];
    studiesData.forEach(d => studies.push(d));
    return Promise.allSettled(studies.map(fn));
}

/**
 * Perform a specific async action for each participant existing in a study in firebase
 * @param {string} studyID id of study to get participants from
 * @param {function} fn action to perform with each participant. Will be passed a firestore snapshot
 * @param {firestore} firestore firestore ref
 */
const forEachStudyParticipant = async (studyID, fn, firestore) => {
    const participantsData = await firestore.collection("studies").doc(studyID).collection("participants").get();
    if (participantsData.empty) return [];
    const participants = [];
    participantsData.forEach(d => participants.push(d));
    return Promise.allSettled(participants.map(fn));
}

/**
 * Find reminders from a participant that are pending. Return text string for those and undefined for rest
 * @param {firestore.Snapshot.data} p particant data from firestore
 * @param {number} now current timestamp
 * @param {number} offset timestamp of current offset from week
 */
const getParticipantReminders = (p, now, offset) =>
    p.reminders.map(r => {
        if (r.startDate > now || r.endDate < now) return undefined;
        if (!r.times.some(t => t > r.lastReminded && t <= offset)) return undefined;
        return r.text;
    });

/**
 * Transaction func that will get the current reminders and add given reminders to them safely
 * @param {firestore.Transaction} t firestore transaction object thats usually passed to the transaction func
 * @param {firestore} firestore firestore ref
 * @param {string} studyID studyId to update reminders for 
 * @param {string} participantID participantID to update reminders for 
 * @param {[string]} reminders list of reminders to update with, contains undefined for whitespace
 * @param {number} now current timestamp
 */
const updateParticipantRemindersTransaction = async (t, firestore, studyID, participantID, reminders, now) => {
    const participant = await t.get(firestore.collection("studies").doc(studyID).collection("participants").doc(participantID));
    const data = participant.data();
    const newReminders = data.reminders.map((r, i) => !!reminders[i] ? { ...r, lastReminded: now } : r);

    reminders = reminders.filter(r => !!r);
    return await t.update(firestore.collection("studies").doc(studyID).collection("participants").doc(participantID),
        { currentReminders: data.currentReminders.concat(reminders), reminders: newReminders }
    );
}

/**
 * Detects errors, figures out what happened and presents everything readably
 * @param {[Promise<[Promise<any>]>]} r list of promises each containing a list of promises. Built to be used with forEachStudy and forEachParticipant return type
 */
const logResponse = r => {
    r = r.filter(study => study.value.every(i => !!i.value));
    let p = r.map(i => i.value).flat().filter(i => !!i.value);
    logger.info(`scheduled reminders run: ${r.length} studies with ${p.length} participants have been updated`);

    let errors = p.filter(i => i.status != "fulfilled").map(i => i.value);
    if (errors.length != 0) logger.error(`scheduled reminders run: ${errors.length} errors detected: ${errors}`);
}


module.exports = ({ admin }) => async () => {
    const firestore = admin.firestore();
    const now = firestore.Timestamp.now();
    const offset = getCurrentOffset(now);

    const resp = await forEachStudy(async study => forEachStudyParticipant(study.id, async participant => {
        // for each study participant
        const data = participant.data();
        let reminders = getParticipantReminders(data, now, offset);
        if (!reminders.some(r => !!r)) return;

        await firestore.runTransaction(async t => updateParticipantRemindersTransaction(t, firestore, study.id, participant.id, reminders, now));
        return true;

    }, firestore), firestore);

    logResponse(resp);

    return resp;
}