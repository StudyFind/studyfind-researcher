const { logger } = require("firebase-functions");

module.exports = ({ admin }) => async () => {
    const firestore = admin.firestore();

    let now = firestore.Timestamp.now(); // in milliseconds
    let offset = now % 604860000; // 1000*60*60*24*7 + 1000*60 == week in milliseconds + 1 min offset
    let count = 0;

    // build study reminders with tuple of [studyId, reminderText] of studies with pending reminders
    const studyReminders = []
    const data = await firestore.collection("studies").get();
    if (data.empty) return;
    data.forEach(study => {
        study = study.data();
        study.reminders.forEach(reminder => {

            if (reminder.startDate > now || reminder.endDate < now)
                return;
            if (!reminder.times.some(t => t > reminder.lastNotified && t < offset))
                return;

            studyReminders.push([study.nctID, reminder.text]);
            // TODO: add user reminders!

            count++;

        });
    });

    logger.info(`sent reminders from #${count} studies`);
}