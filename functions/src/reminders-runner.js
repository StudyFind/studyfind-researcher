const { logger } = require("firebase-functions");

/**
 * convert timestamp into 30-min-interval offset from beginning of week
 * ((now % 1000*60*60*24*7) / 1000*60*30) * 1000*60*30
 * ((now % week in milliseconds) / 30 min standard) * 30 min standard
 * @param {firestore.Timestamp} now current timestamp
 */
const getCurrentOffset = (now) => Math.floor((now % 604800000) / 1800000) * 1800000;

/**
 * Get all studies with pending reminders and converts into nice
 * structure like: [{ id: str, reminders: [str] }]
 * @param {firestore} firestore firestore ref object
 * @param {firestore.Timestamp} now current timestamp
 */
const getRemindingStudies = (firestore, now) => {
    const offset = getCurrentOffset(now);
    return firestore.collection("studies").get()
        .then(data => { // filter and build struct
            const studyReminders = [];
            data.forEach(d => {
                const reminders = []
                study = d.data();
                study.reminders.forEach(r => {

                    if (r.startDate > now || r.endDate < now)
                        return; // continue
                    if (!r.times.some(t => t > r.lastReminded && t <= offset))
                        return;

                    reminders.push(r.text);
                });
                if (reminders.length > 0) studyReminders.push({ id: d.id, reminders })
            })
            return studyReminders;
        })
}

/**
 * Give all participants of study a series of reminders and then update study data
 * @param {firestore} firestore firestore ref object
 * @param {{ id: str, reminders: [str] }} reminder structure describing study and reminder to be given
 */
const updateParticipantReminders = (firestore, reminder, now) =>
    firestore.collection("studies").doc(reminder.id).collection("participants").get()
        .then(data => {
            const participantRefs = [];
            data.forEach(participant => {
                participantRefs.push(firestore.collection("studies").doc(reminder.id).collection("participants").doc(participant.id))
            });
            return participantRefs;
        })
        .then(refs => Promise.allSettled(refs.map(r => {
            return firestore.runTransaction(async t => {
                const doc = await t.get(r);
                await t.update(r, { reminders: doc.reminders.concat(reminder.reminders) });
            })
                .catch(err => { throw Error(`Transaction failed for '${reminder.id}': ${err}`) })
        })))
        .then(resp => firestore.collection("studies").doc(reminder.id).update({ lastReminded: now }))



module.exports = ({ admin }) => async () => {
    const firestore = admin.firestore();
    const now = firestore.Timestamp.now();

    return getRemindingStudies(firestore, now)
        // dispatch transactions to update them all
        .then(reminders => Promise.allSettled(reminders.map(async r =>
            updateParticipantReminders(firestore, r, now)
        )))
        .then(resp => {
            logger.info(`Reminders have run`)
        })


    // .then(data => filterCurrentReminders(data, firestore.Timestamp.now()))
    // .then(async reminders => [reminders, await Promise.all(reminders.map(r =>
    //     firestore.collection("studies").doc(r.nctID).collection("participants").get()
    // ))])
    // .then(([reminders, all_data]) => buildNewParticipantReminders(reminders, all_data))
    // .then(reminders => Promise.all(reminders.map(r =>
    //     firestore.collection("studies").doc(r.nctID).collection("participants").doc(r.participantID)
    //         .set({ reminders: r.reminders }, { merge: true })
    // )))
    // .then(all_resp => {
    //     logger.info(`Successfully sent ${all_resp.length} reminder(s)`);
    // })
    // .catch(err => {
    //     logger.error(`Error sending reminders at ${now}: ${err}`);
    //     throw err;
    // });

    // logger.info(`sent reminders from #${count} studies`);
}