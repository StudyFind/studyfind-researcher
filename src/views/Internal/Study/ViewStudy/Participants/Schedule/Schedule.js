import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { firestore } from "database/firebase";
import { useCollection } from "hooks";

import ScheduleView from "./ScheduleView";
import ScheduleEdit from "./ScheduleEdit";

function Schedule({ participant, study }) {
  const defaultInputs = {
    name: "",
    link: "",
    time: "",
    date: "",
  };
  const fittedScheduleRef = firestore
    .collection("schedule")
    .where("participantID", "==", participant.id)
    .where("studyID", "==", study.id);
  const scheduleRef = firestore.collection("schedule");
  const [schedules, loading, error] = useCollection(fittedScheduleRef);

  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState(defaultInputs);
  const [errors, setErrors] = useState({});
  const [scheduleID, setScheduleID] = useState("");

  const convertEpochToHMS = (ms) => {
    const second = (ms / 1000) % 60;
    const minute = ((ms / 1000 - second) / 60) % 60;
    const hour = (ms / 1000 - minute * 60 - second) / 3600;
    return { hour, minute, second };
  };

  const getTimeFromOffset = (offset) => {
    const thisHour = convertEpochToHMS(offset).hour % 24;
    const thisMinute = convertEpochToHMS(offset).minute;
    let newTime;
    if (thisMinute / 10 < 1) {
      if (thisHour < 10) {
        newTime = `0${thisHour}:0${thisMinute}`;
      } else {
        newTime = `${thisHour}:0${thisMinute}`;
      }
    } else {
      if (thisHour < 10) {
        newTime = `0${thisHour}:${thisMinute}`;
      } else {
        newTime = `${thisHour}:${thisMinute}`;
      }
    }
    return newTime;
  };

  const formatDate = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const converted = date.toDate();
    const month = converted.getMonth();
    const day = converted.getDate();
    const year = converted.getFullYear();

    return `${months[month]} ${day}, ${year}`;
  };

  const convertDate = (date) => {
    const converted = date.toDate();
    const month = converted.getMonth() + 1;
    const day = converted.getDate();
    const year = converted.getFullYear();
    if (month < 10) {
      if (day < 10) {
        return `${year}-0${month}-0${day}`;
      } else {
        return `${year}-0${month}-${day}`;
      }
    } else {
      if (day < 10) {
        return `${year}-${month}-0${day}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    }
  };

  const goToEdit = (schedule) => {
    setInputs({
      name: schedule.name,
      link: schedule.link,
      time: getTimeFromOffset(schedule.time),
      date: convertDate(schedule.date),
    });
    setScheduleID(schedule.id);
    setEdit(true);
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: !value });
  };

  const handleDelete = (schedule) => {
    scheduleRef.doc(schedule.id).delete();
  };

  const handleCancel = () => {
    setInputs(defaultInputs);
    setEdit(false);
  };

  const handleSubmit = () => {
    if (!inputs.name) {
      setErrors({ ...errors, name: true });
      return;
    }

    if (!inputs.date) {
      setErrors({ ...errors, date: true });
      return;
    }

    if (!inputs.link) {
      setErrors({ ...errors, link: true });
      return;
    }

    if (!inputs.time) {
      setErrors({ ...errors, time: true });
      return;
    }

    const convertedTime = convertToTime();
    const [year, month, day] = inputs.date.split("-");
    const firestoreDate = firebase.firestore.Timestamp.fromDate(
      new Date(year, month - 1, day)
    );

    const newSchedule = {
      name: inputs.name,
      time: convertedTime,
      date: firestoreDate,
      link: inputs.link,
      participantID: participant.id,
      studyID: study.id,
    };

    if (!scheduleID) {
      scheduleRef.add(newSchedule);
      console.log("new");
    } else {
      scheduleRef.doc(scheduleID).update(newSchedule);
      console.log("old");
    }

    setInputs({
      name: "",
      time: "",
      date: "",
      link: "",
    });
    setEdit(false);
    setScheduleID("");
  };

  const convertToTime = () => {
    const [hour, min] = inputs.time.split(":");
    const [year, month, day] = inputs.date.split("-");
    const firestoreDate = firebase.firestore.Timestamp.fromDate(
      new Date(year, month - 1, day)
    );
    const weekday = firestoreDate.toDate().getUTCDay();
    const thisTime =
      ((parseInt(hour) + 24 * weekday) * 60 + parseInt(min)) * 60 * 1000;
    return thisTime;
  };

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
      formatDate={formatDate}
      setEdit={setEdit}
      goToEdit={goToEdit}
      getTimeFromOffset={getTimeFromOffset}
      handleDelete={handleDelete}
    />
  );
}

export default Schedule;
