const { logger } = require("firebase-functions");

module.exports = ({ admin }) => async () => {
    const firestore = admin.firestore();

    let now = firestore.Timestamp.now(); // in milliseconds
    let offset = now % 604860000; // 1000*60*60*24*7 + 1000*60 == week in milliseconds + 1 min offset
    let count = 0;

    // cannot yet get on subcollections. Check back when that changes
    const snapshot = await firestore.collection("studies").get();
    if (snapshot.empty) return;
    snapshot.forEach(study => {
        study.notifications.forEach(notification => {

            if (notification.startDate > now || notification.endDate < now)
                return;
            if (!notification.times.some(t => t > notification.lastNotified && t < offset))
                return;

            // TODO: add user notifications!

            count++;

        });
    });

    logger.info(`sent notifications from #${count} studies`);
}