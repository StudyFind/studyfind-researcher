const { logger } = require("firebase-functions");

/**
 * filter studies and build tuple of { nctID, text } for studies with next pending reminders
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
    console.log(studyReminders); // FIXME: remove logging
    return studyReminders;
}

module.exports = ({ admin }) => (async () => {
    const firestore = admin.firestore();

    return await firestore.collection("studies")
        .get()
        .then(data => filterCurrentReminders(data, firestore.Timestamp.now()))
        .then(async reminders => [reminders, await Promise.all(reminders.map(r =>
            firestore.collection("studies").doc(r.nctID).collection("participants").get()
        ))])
        .then(([reminders, all_data]) => {
            // console.log(all_data)
            all_data.forEach(d => console.log)
        })
        .catch(err => {
            logger.error(`Error sending reminders at ${now}: ${err}`);
            throw err
        })

    // logger.info(`sent reminders from #${count} studies`);
})