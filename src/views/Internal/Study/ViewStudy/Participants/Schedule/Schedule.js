import React, { useState } from "react";
import validator from "validator";
import { Spinner } from "components";
import { firestore } from "database/firebase";
import { useCollection } from "hooks";

import ScheduleView from "./ScheduleView";
import ScheduleEdit from "./ScheduleEdit";
import ScheduleError from "./ScheduleError";

function Schedule({ participant, study }) {
  const defaultInputs = {
    name: "",
    link: "",
    time: "",
    date: "",
  };

  const scheduleCollectionRef = firestore.collection("schedule");

  const [schedules, loading, error] = useCollection(
    firestore
      .collection("schedule")
      .where("participantID", "==", participant.id)
      .where("studyID", "==", study.id)
      .orderBy("time", "desc")
  );

  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState(defaultInputs);
  const [errors, setErrors] = useState({});
  const [scheduleID, setScheduleID] = useState("");

  const checker = (name, value) => {
    if (!value) return true;

    switch (name) {
      case "date":
        return value < Date.now() && "Date must be in the future";
      case "link":
        return (
          (!validator.isURL(value) || value.substring(0, 8) !== "https://") && "Link is invalid"
        );
      default:
        return !value;
    }
  };

  const validate = ({ name, date, time, link }) => ({
    name: checker("name", name),
    date: checker("date", date),
    time: checker("time", time),
    link: checker("link", link),
  });

  const getEpoch = (date, time) => {
    const [year, month, day] = date.split("-");
    const [hour, minute] = time.split(":");
    return new Date(year, month - 1, day, hour, minute).getTime();
  };

  const getDate = (epoch) => {
    const date = new Date(epoch);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const pad = (value) => (value < 10 ? "0" : "");
    return `${year}-${pad(month)}${month}-${pad(day)}${day}`;
  };

  const getTime = (epoch) => {
    const date = new Date(epoch);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const pad = (value) => (value < 10 ? "0" : "");
    return `${pad(hours)}${hours}:${pad(minutes)}${minutes}`;
  };

  const goToEdit = (schedule) => {
    if (schedule) {
      setInputs({
        name: schedule.name,
        link: schedule.link,
        time: getTime(schedule.time),
        date: getDate(schedule.time),
      });
      setScheduleID(schedule.id);
    }
    setEdit(true);
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: checker(name, value) });
  };

  const handleDelete = (schedule) => {
    scheduleCollectionRef.doc(schedule.id).delete();
  };

  const handleCancel = () => {
    setInputs(defaultInputs);
    setErrors(defaultInputs);
    setEdit(false);
    setScheduleID("");
  };

  const handleSubmit = () => {
    const err = validate(inputs);
    setErrors(err);
    if (err.name || err.date || err.link || err.time) return;

    const data = {
      name: inputs.name,
      time: getEpoch(inputs.date, inputs.time),
      link: inputs.link,
      participantID: participant.id,
      studyID: study.id,
    };

    if (scheduleID) {
      scheduleCollectionRef.doc(scheduleID).update(data);
    } else {
      scheduleCollectionRef.add(data);
    }

    handleCancel();
  };

  if (loading) return <Spinner />;
  if (error) return <ScheduleError />;

  return edit ? (
    <ScheduleEdit
      inputs={inputs}
      errors={errors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  ) : (
    <ScheduleView
      schedules={schedules}
      participant={participant}
      setEdit={setEdit}
      goToEdit={goToEdit}
      handleDelete={handleDelete}
    />
  );
}

export default Schedule;
