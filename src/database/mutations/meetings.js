import { firestore } from "database/firebase";
import moment from "moment";
import validator from "validator";

const checker = (name, value) => {
  if (!value) return true;

  if (name === "date" && value < Date.now()) {
    return "Date must be in the future";
  }

  if (name === "time" && value.split(":")[1] % 30) {
    return "Time must be divisible by 30 minutes";
  }

  if (name === "link" && !validator.isURL(value)) {
    return "Link is invalid";
  }

  return false;
};

const validate = ({ name, date, time, link }) => ({
  name: checker("name", name),
  date: checker("date", date),
  time: checker("time", time),
  link: checker("link", link),
});

const convertDatetimeToTimestamp = (date, time) => {
  return moment(`${date} ${time}`, "YYYY/MM/DD HH:mm").utc().valueOf();
};

const convertTimestampToDate = (timestamp) => {
  return moment(timestamp).format("YYYY/MM/DD");
};

const convertTimestampToTime = (timestamp) => {
  return moment(timestamp).format("h:mma");
};

const createMeeting = async ({ name, date, time, link }) => {
  const errors = validate({ name, date, time, link });

  if (errors.name || errors.date || errors.time || errors.link) {
    throw errors;
  }

  if (link.substring(0, 7) !== "http://" || link.substring(0, 8) !== "https://") {
    link = "https://" + link;
  }

  await firestore
    .collection("meetings")
    .add({ name, link, time: convertDatetimeToTimestamp(date, time) });
};

const updateMeeting = async (meetingID, { name, date, time, link }) => {
  const errors = validate({ name, date, time, link });

  if (errors.name || errors.date || errors.time || errors.link) {
    throw errors;
  }

  if (link.substring(0, 7) !== "http://" || link.substring(0, 8) !== "https://") {
    link = "https://" + link;
  }

  await firestore
    .collection("meetings")
    .doc(meetingID)
    .update({ name, link, time: convertDatetimeToTimestamp(date, time) });
};

const deleteMeeting = async (meetingID) => {
  await firestore.collection("meetings").doc(meetingID).delete();
};

export { createMeeting, updateMeeting, deleteMeeting };
