// functions/src/reminders-runner.js
const { logger } = require("firebase-functions");
const getOffset = require("./utils/offset-time");
const moment = require('moment');
require('moment-timezone');


const forEachTimezoneOffset = async(now, fn) => {
	const HOUR = 3600000; // in milliseconds: mill * seconds * minutes == 1000 * 60 * 60 == 
	const offsets = Array.from(
		Array.from(Array(24).keys()).map(t => (HOUR * t-12))
	);
	return Promise.allSettled(offset.map(o => fn(o+now)));
}

/**
 * Perform a given async action for each reminder that potentially needs to be set. We don't
 * exactly know the timezone of each reminder, so query range +-12 and attach to user timezone.
 * Relevant query docs: https://firebase.google.com/docs/firestore/query-data/queries
 * @param {number} now current timestamp
 * @param {function} fn action to perform with each pending reminder. Will be passed a firestore snapshot
 * @param {firestore} firestore firestore ref
 */
const forEachPendingReminder = async (now, fn, firestore) => {
	const HOUR = 3600000; // in milliseconds: mill * seconds * minutes == 1000 * 60 * 60 == 
	const offsetTimes = Array.from(
		Array.from(Array(24).keys()).map(t => getOffset(HOUR * (t-12) + now))
	);
	return Promise.allSettled(offsetTimes.map(async (t, i) => {
		// for each timezone offset
		const offsetWeek = t;
		const remindersData = await firestore.collection("reminders")
			.where("times", "array-contains", offsetWeek)
			.where("endDate", ">", t)
			.get();
		let reminders = [];
		remindersData.forEach(r => reminders.push(r));
		reminders = reminders.filter(r => r.data().startDate <= t); // filter if haven't started yet
		if (reminders.length === 0) return [];
		// check all reminders
		return Promise.allSettled(reminders.map(async r => {
			console.log(r.data())
			const participantData = await firestore
				.collection("participants").doc(r.get('participantID'))
				.get();
			const timezone = participantData.get('timezone');
			const offset = moment().tz(timezone).utcOffset() * 60 * 1000; // convert minutes to milliseconds
			console.log(t)
			if (offset + offsetWeek !== t) return null;
			return fn(r);
		}));
	}));
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
	const now = Date.now();

	// STEPS:
	// do a query filter for all reminders that need to be sent
	//   by time (adjusting for timezone), start+endDate
	// open transaction for each reminder, append to user, update reminder lastReminded

	const resp = await forEachPendingReminder(now, async snap => {
		// for each pending reminder	
		const r = snap.data();
		return firestore.runTransaction(async t => {
			// get referenced study participant
			const participant = await t.get(firestore
				.collection("studies").doc(r.studyID)
				.collection("participants").doc(r.participantID)
			);
			if (!participant.exists) throw Error(`Participant ${r.participantID} from study ${r.studyID} not found`);
			const data = participant.data();

			// update their reminders
			await t.update(
				firestore.collection("studies").doc(r.studyID)
				.collection("participants").doc(r.participantID),
				{ currentReminders: data.currentReminders ? data.currentReminders.concat(r.title) : [r.title] }
			);
			return true
		})
	}, firestore);

	logResponse(resp);

	return resp;
}
