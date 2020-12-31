// functions/src/reminders-runner.js
const { logger } = require("firebase-functions");

/**
 * convert timestamp into 30-min-interval offset from beginning of week
 * ((now % 1000*60*60*24*7) / 1000*60*30) * 1000*60*30
 * ((now % week in milliseconds) / 30 min standard) * 30 min standard
 * @param {number} now current timestamp
 */
const getCurrentOffset = (now) => Math.floor((now % 604800000) / 1800000) * 1800000;


/**
 * Perform a given async action for each reminder currently pending being sent
 * @param {number} now current timestamp
 * @param {function} fn action to perform with each pending reminder. Will be passed a firestore snapshot
 * @param {firestore} firestore firestore ref
 */
const forEachPendingReminder = async (now, fn, firestore) => {
	const offset = getCurrentOffset(now)
	const remindersData = await firestore.collection("reminders")
		.where("times","array-contains", offset)
		.where("startDate", "<=", now)
		.where("endDate", ">", now)
		.where("lastReminded", "<", now)
		.get();
	if (remindersData.empty) return [];

	const reminders = [];
	remindersData.forEach(r => reminders.push(r))
	return Promise.allSettled(reminders.map(fn))
}


/**
 * Detects errors, figures out what happened and presents everything readably
 * @param {[Promise<any>]} r list of promises corresponding to each each participant-update transaction sent 
 */
const logResponse = r => {
	let p = r.map(i => i.value)
	logger.info(`scheduled reminders run: ${p.length} participants have been updated`);

	let errors = r.filter(i => i.status != "fulfilled").map(i => i.value);
	if (errors.length != 0) logger.error(`scheduled reminders run: ${errors.length} errors detected: ${errors}`);
}


module.exports = ({ admin }) => async () => {
    const firestore = admin.firestore();
    const now = firestore.Timestamp.now();

	// STEPS:
	// do a query filter for all reminders that need to be sent
	//   by time, start+endDate, lastReminded
	// open transaction for each reminder, append to user, update reminder lastReminded

	const resp = await forEachPendingReminder(now, async snap => {
		// for each pending reminder	
		const r = snap.data();
		return firestore.runTransaction(async t => {
			// get referenced study participant
			const participant = await t.get(firestore.collection("studies").doc(r.study).collection("participants").doc(r.participant));
			if (!participant.exists) throw Exception(`Participant ${r.participant} from study ${r.study} not found`);
			const data = participant.data();

			// update their notifications and update reminder `lastUpdated` field
			await t.update(
				firestore.collection("studies").doc(r.study).collection("participants").doc(r.participant),
				{ currentReminders: data.currentReminders ? data.currentReminders.concat(r.text) : [r.text] }
			);
			await t.update(
				firestore.collection("reminders").doc(snap.id),
				{ lastReminded: now }
			);
			return true
		})
	}, firestore);

	logResponse(resp);

    return resp;
}
