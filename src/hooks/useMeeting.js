import { useState, useEffect } from "react";
import { firestore } from "database/firebase";
import moment from "moment";
import validator from "validator";

function useMeeting(meeting) {
  const [inputs, setInputs] = useState({ name: "", date: "", time: "", link: "" });
  const [errors, setErrors] = useState({ name: "", date: "", time: "", link: "" });

  const handleInitial = () => {
    const { name, time: timestamp, link } = meeting;
    const time = convertTimestampToTime(timestamp);
    const date = convertTimestampToDate(timestamp);
    const initial = { name, date, time, link };

    if (meeting) {
      setInputs(initial);
      setErrors(validate(initial));
    }
  };

  useEffect(handleInitial, [meeting]);

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

    meeting
      ? await firestore.collection("meetings").doc(meeting.id).update(payload)
      : await firestore.collection("meetings").add(payload);
  };

  const handleDelete = async () => {
    await firestore.collection("meetings").doc(meeting.id).delete();
  };

  const handleCancel = handleInitial;

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  return [inputs, errors, handleChange, handleSubmit, handleDelete, handleCancel];
}

export { useMeeting };
