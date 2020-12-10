const { logger } = require("firebase-functions");

module.exports = ({ admin }) => async () => {
    const firestore = admin.firestore();

    let now = firestore.Timestamp.now(); // in milliseconds
    let offset = now % 604860000; // 1000*60*60*24*7 + 1000*60 == week in milliseconds + 1 min offset
    let count = 0;

    // build studyNotifications with tuple of [studyId, reminderText] of studies with pending reminders
    const studyNotifications = []
    const data = await firestore.collection("studies").get();
    if (data.empty) return;
    data.forEach(study => {
        study = study.data();
        study.notifications.forEach(notification => {

            if (notification.startDate > now || notification.endDate < now)
                return;
            if (!notification.times.some(t => t > notification.lastNotified && t < offset))
                return;

            studyNotifications.push([study.nctID, notification.text]);
            // TODO: add user notifications!

            count++;

        });
    });

    logger.info(`sent notifications from #${count} studies`);
}