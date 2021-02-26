// functions/src/reminders-runner.js
const { logger } = require("firebase-functions");
const getOffset = require("./utils/offset-time");

/**
 * Perform a given async action for each reminder currently pending being sent
 * @param {number} now current timestamp
 * @param {function} fn action to perform with each pending reminder. Will be passed a firestore snapshot
 * @param {firestore} firestore firestore ref
 */
const forEachPendingReminder = async (now, fn, firestore) => {
	const offset = getOffset(now);
	const remindersData = await firestore.collection("reminders")
		.where("times", "array-contains", offset)
		// .where("startDate", "<=", now)
		.where("endDate", ">", now)
		.get();
	if (remindersData.empty) return [];

	const reminders = [];
	remindersData.forEach(r => reminders.push(r));
	reminders = reminders.filter(r => r.data().startDate <= now);
	return Promise.allSettled(reminders.map(fn));
}


/**
 * Detects errors, figures out what happened and presents everything readably
 * @param {[Promise<any>]} r list of promises corresponding to each each participant-update transaction sent 
 */
const logResponse = r => {
	logger.info(`scheduled reminders run: ${r.length} participants have been updated`);

	const errors = r.filter(i => i.status !== "fulfilled").map(i => i.reason);
	if (errors.length === 0) return

	console.error(`${r.length} scheduled reminders run with ${errors.length} errors detected:\n${errors.map(r => r.stack).join("\n")}`);
}


module.exports = ({ admin }) => async () => {
	const firestore = admin.firestore();
	const now = admin.firestore.Timestamp.now();

	// STEPS:
	// do a query filter for all reminders that need to be sent
	//   by time, start+endDate
	// open transaction for each reminder, append to user, update reminder lastReminded

	const resp = await forEachPendingReminder(now, async snap => {
		// for each pending reminder	
		const r = snap.data();
		return firestore.runTransaction(async t => {
			// get referenced study participant
			const participant = await t.get(firestore.collection("studies").doc(r.study).collection("participants").doc(r.participant));
			if (!participant.exists) throw Error(`Participant ${r.participant} from study ${r.study} not found`);
			const data = participant.data();

			// update their reminders
			await t.update(
				firestore.collection("studies").doc(r.study).collection("participants").doc(r.participant),
				{ currentReminders: data.currentReminders ? data.currentReminders.concat(r.text) : [r.text] }
			);
			return true
		})
	}, firestore);

	logResponse(resp);

	return resp;
}
