import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { firestore } from "database/firebase";
import { useCollection } from "hooks";

import RemindView from "./RemindView";
import RemindEdit from "./RemindEdit";

function Remind({ participant, study }) {
  const defaultInputs = {
    title: "",
    weekdays: [false, false, false, false, false, false, false],
    times: [],
    startDate: "",
    endDate: "",
  };
  const fittedRemindersRef = firestore
    .collection("reminders")
    .where("participantID", "==", participant.id)
    .where("studyID", "==", study.id);

  const remindersRef = firestore.collection("reminders");

  const [reminders, loading, error] = useCollection(fittedRemindersRef);

  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState(defaultInputs);
  const [errors, setErrors] = useState({});
  const [reminderID, setReminderID] = useState("");

  const convertEpochToHMS = (ms) => {
    const second = (ms / 1000) % 60;
    const minute = ((ms / 1000 - second) / 60) % 60;
    const hour = (ms / 1000 - minute * 60 - second) / 3600;
    return { hour, minute, second };
  };

  const getDayIndexFromOffset = (offset) => {
    const offsetHour = convertEpochToHMS(offset);
    return Math.floor(offsetHour.hour / 24);
  };

  const getDaysFromOffsets = (offsets) => {
    const weekdaysBoolean = [false, false, false, false, false, false, false];

    for (const offset of offsets) {
      const day = getDayIndexFromOffset(offset);
      weekdaysBoolean[day] = true;
    }

    return weekdaysBoolean;
  };

  const getTimesFromOffsets = (offsets) => {
    const allTimes = [];
    const numberOfDaysSelected = getDaysFromOffsets(offsets).filter(
      (value) => value,
    ).length;

    for (let i = 0; i < offsets.length / numberOfDaysSelected; i++) {
      const thisHour = convertEpochToHMS(offsets[i]).hour % 24;
      const thisMinute = convertEpochToHMS(offsets[i]).minute;
      let newTime;
      if (thisMinute / 10 < 1) {
        newTime = `${thisHour}:0${thisMinute}`;
      } else {
        newTime = `${thisHour}:${thisMinute}`;
      }
      allTimes.push(newTime);
    }

    return allTimes;
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
    let returnedDate;
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

  const goToEdit = (reminder) => {
    setInputs({
      title: reminder.title,
      weekdays: getDaysFromOffsets(reminder.times),
      times: getTimesFromOffsets(reminder.times),
      startDate: convertDate(reminder.startDate),
      endDate: convertDate(reminder.endDate),
    });
    setReminderID(reminder.id);
    setEdit(true);
  };

  const handleChange = (name, value) => {
    setInputs({ ...inputs, [name]: value });
    setErrors({ ...errors, [name]: !value });
  };

  const handleDayToggle = (index) => {
    setInputs((prevState) => {
      const weekdays = [...prevState.weekdays];
      weekdays[index] = !weekdays[index];
      return {
        ...prevState,
        weekdays,
      };
    });
  };

  const handleAddTime = () => {
    const value = inputs.time;

    if (!value) {
      setErrors({ ...errors, time: "Please enter a valid time" });
      return;
    }

    if (typeof value === "string") {
      const minute = value.split(":")[1];
      if (minute % 30 !== 0) {
        setErrors({ ...errors, time: "Times must be divisible by 30 minutes" });
        return;
      }
    }

    setInputs((prevState) => {
      const times = prevState.times;
      times.push(value);
      return { ...prevState, times, time: "" };
    });
  };

  const handleDelete = (reminder) => {
    remindersRef.doc(reminder.id).delete();
  };

  const handleDeleteTime = (index) => {
    setInputs((prevState) => {
      const updated = prevState.times.filter((v, i) => i !== index);
      return {
        ...prevState,
        times: updated,
      };
    });
  };

  const handleCancel = () => {
    setInputs(defaultInputs);
    setEdit(false);
  };

  const handleSubmit = () => {
    if (!inputs.title) {
      setErrors({ ...errors, title: true });
      return;
    }

    if (!inputs.startDate) {
      setErrors({ ...errors, startDate: true });
      return;
    }

    if (!inputs.endDate) {
      setErrors({ ...errors, endDate: true });
      return;
    }

    if (!inputs.times.length) {
      setErrors({ ...errors, time: "Please add at least one time" });
      return;
    }

    if (!inputs.weekdays.length) {
      setErrors({ ...errors, day: "Please choose at least one day" });
      return;
    }

    const convertedTimes = convertToTimes();
    const [startYear, startMonth, startDay] = inputs.startDate.split("-");
    const firestoreStartDate = firebase.firestore.Timestamp.fromDate(
      new Date(startYear, startMonth - 1, startDay),
    );
    const [endYear, endMonth, endDay] = inputs.endDate.split("-");
    const firestoreEndDate = firebase.firestore.Timestamp.fromDate(
      new Date(endYear, endMonth - 1, endDay),
    );

    const newReminder = {
      title: inputs.title,
      times: convertedTimes,
      startDate: firestoreStartDate,
      endDate: firestoreEndDate,
      lastNotified: new Date(0, 0, 0),
      participantID: participant.id,
      studyID: study.id,
    };

    if (firestoreStartDate > firestoreEndDate) {
      setErrors({ ...errors, endDate: "End date must be after start date" });
      return;
    }

    if (!reminderID) {
      remindersRef.add(newReminder);
    } else {
      remindersRef.doc(reminderID).update(newReminder);
    }

    setInputs({
      title: "",
      weekdays: [],
      times: [],
      startDate: "",
      endDate: "",
    });
    setEdit(false);
    setReminderID("");
  };

  const convertToTimes = () => {
    const allTimes = [];
    const weekdayBoolean = inputs.weekdays;
    for (const weekday in weekdayBoolean) {
      if (weekdayBoolean[weekday]) {
        inputs.times.map((time, index) => {
          const [hour, min] = time.split(":");
          const thisTime =
            ((parseInt(hour) + 24 * weekday) * 60 + parseInt(min)) * 60 * 1000;
          allTimes.push(thisTime);
        });
      }
    }
    return allTimes;
  };

  return edit ? (
    <RemindEdit
      inputs={inputs}
      errors={errors}
      handleChange={handleChange}
      handleDayToggle={handleDayToggle}
      handleAddTime={handleAddTime}
      handleDeleteTime={handleDeleteTime}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
    />
  ) : (
    <RemindView
      reminders={reminders}
      participant={participant}
      formatDate={formatDate}
      setEdit={setEdit}
      goToEdit={goToEdit}
      getDaysFromOffsets={getDaysFromOffsets}
      getTimesFromOffsets={getTimesFromOffsets}
      handleDelete={handleDelete}
    />
  );
}

export default Remind;
