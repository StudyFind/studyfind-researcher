import { useState, useEffect } from "react";
import { firestore } from "database/firebase";
import moment from "moment";
import validator from "validator";

function useMeeting(reminder) {
  const [exists, setExists] = useState(false);
  const [inputs, setInputs] = useState({ name: "", date: "", time: "", link: "" });
  const [errors, setErrors] = useState({ name: "", date: "", time: "", link: "" });

  const handleInitial = () => {
    const { name, time: timestamp, link } = reminder;
    const time = convertTimestampToTime(timestamp);
    const date = convertTimestampToDate(timestamp);
    const initial = { name, date, time, link };

    if (reminder) {
      setExists(true);
      setInputs(initial);
      setErrors(validate(initial));
    }
  };

  useEffect(handleInitial, [reminder]);

  const validate = ({ name, date, time, link }) => ({
    name: checker("name", name),
    date: checker("date", date),
    time: checker("time", time),
    link: checker("link", link),
  });

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

  const convertDatetimeToTimestamp = (date, time) => {
    return moment(`${date} ${time}`, "YYYY/MM/DD HH:mm").utc().valueOf();
  };

  const convertTimestampToDate = (timestamp) => {
    return moment(timestamp).format("YYYY/MM/DD");
  };

  const convertTimestampToTime = (timestamp) => {
    return moment(timestamp).format("h:mma");
  };

  const handleSubmit = async ({ name, date, time, link }) => {
    const err = validate({ name, date, time, link });

    if (err.name || err.date || err.time || err.link) {
      setErrors(err);
    }

    if (link.substring(0, 7) !== "http://" || link.substring(0, 8) !== "https://") {
      link = "https://" + link;
    }

    const payload = {
      name,
      link,
      time: convertDatetimeToTimestamp(date, time),
    };

    exists
      ? await firestore.collection("reminders").doc(reminder.id).update(payload)
      : await firestore.collection("reminders").add(payload);
  };

  const handleDelete = async () => {
    await firestore.collection("reminders").doc(reminder.id).delete();
  };

  const handleCancel = handleInitial;

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  return [inputs, errors, handleChange, handleSubmit, handleDelete, handleCancel];
}

export { useMeeting };
