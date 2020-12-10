const { logger } = require("firebase-functions");

/**
 * Filter studies and build array of tuples like: { nctID, text } for studies with next pending reminders
 * @param {firestore.collection} data 
 * @param {firestore.Timestamp} now 
 */
const filterCurrentReminders = (data, now) => {
    let offset = now % 604860000; // 1000*60*60*24*7 + 1000*60 == week in milliseconds + 1 min offset
    const studyReminders = []
    data.forEach(study => {
        study = study.data();
        study.reminders.forEach(r => {

            if (r.startDate > now || r.endDate < now)
                return; // continue
            if (!r.times.some(t => t > r.lastNotified && t <= offset))
                return;

            studyReminders.push({ nctID: study.nctID, text: r.text });
        });
    });
    return studyReminders;
}

/**
 * Build flat list of structures like: { nctID, participantID, reminders } corresponding to the new
 * reminders that should be written to study participants in firebase
 * @param {[{nctID, text}]} reminders list of corresponding studies and reminders to post
 * @param {[firestore.collection]} all_data list of study participants from firestore; ordered same as reminders
 */
const buildNewParticipantReminders = (reminders, all_data) => {
    const participantReminders = [];
    all_data.forEach((study_data, i) => study_data.forEach(participant => {
        let d = participant.data();
        participantReminders.push({
            nctID: reminders[i].nctID,
            participantID: participant.id,
            reminders: [...d.reminders, reminders[i].text]
        });
    }));
    return participantReminders;
}



module.exports = ({ admin }) => (async () => {
    const firestore = admin.firestore();

    return await firestore.collection("studies")
        .get()
        .then(data => filterCurrentReminders(data, firestore.Timestamp.now()))
        .then(async reminders => [reminders, await Promise.all(reminders.map(r =>
            firestore.collection("studies").doc(r.nctID).collection("participants").get()
        ))])
        .then(([reminders, all_data]) => buildNewParticipantReminders(reminders, all_data))
        .then(reminders => Promise.all(reminders.map(r =>
            firestore.collection("studies").doc(r.nctID).collection("participants").doc(r.participantID)
                .set({ reminders: r.reminders }, { merge: true })
        )))
        .then(all_resp => {
            logger.info(`Successfully sent ${all_resp.length} reminder(s)`);
        })
        .catch(err => {
            logger.error(`Error sending reminders at ${now}: ${err}`);
            throw err;
        });

    // logger.info(`sent reminders from #${count} studies`);
})