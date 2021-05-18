import { useState, useEffect } from "react";

import moment from "moment";

import { datetime } from "functions";
import { firestore } from "database/firebase";

function useReminder(reminder) {
  const [inputs, setInputs] = useState({
    title: "",
    weekdays: [false, false, false, false, false, false, false],
    times: [],
    startDate: "",
    endDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleInitial = () => {
    const [weekdays, times] = convertOffsetsToWeekdaysAndTimes(reminder.times);
    const { title, startDate, endDate } = reminder;
    const initial = { title, times, weekdays, startDate, endDate };

    if (reminder) {
      setInputs(initial);
      setErrors(validate(initial));
    }
  };

  useEffect(handleInitial, [reminder]);

  const handleCheckTime = (time, prev) => {
    if (!time) return true;
    if (prev.times.includes(time)) return "Time has been already added";
    if (time.split(":")[1] % 30) return "Time must be divisible by 30 minutes";
  };

  const handleAddTime = (time) => {
    setErrors((prev) => {
      const error = handleCheckTime(time, prev);
      return { ...prev, times: error };
    });

    setInputs((prev) => {
      const times = prev.times;
      times.push(time);
      times.sort();
      return { ...prev, times };
    });
  };

  const handleDeleteTime = (index) => {
    setInputs((prev) => ({ ...prev, times: prev.times.filter((_, i) => i !== index) }));
  };

  const handleToggleDay = (index) => {
    setInputs((prev) => ({ ...prev, weekdays: prev.weekdays.map((v, i) => (i !== index) ^ v) }));
  };

  const validate = ({ title, weekdays, times, startDate, endDate }) => ({
    title: checker("title", title),
    weekdays: checker("weekday", weekdays),
    times: checker("times", times),
    startDate: checker("startDate", startDate),
    endDate: checker("endDate", endDate),
  });

  const checker = (name, value) => {
    if (!value) return true;

    if (name === "times" && !value.length) {
      return "Please add at least one time";
    }

    if (name === "weekdays" && !value.some((v) => v)) {
      return "Please add at least one time";
    }

    if (name === "startDate" && value < datetime.getToday()) {
      return "Start date must be in the future";
    }

    if (name === "endDate" && value < inputs.startDate) {
      return "End date must be after start date";
    }

    return false;
  };

  const convertWeekdaysAndTimesToOffsets = (weekdays, times) => {
    const offsets = [];

    weekdays.forEach((_, index) => {
      times.forEach((time) => {
        const [hour, minute] = time.split(":");

        const hours = 24 * index + parseInt(hour);
        const minutes = hours * 60 + parseInt(minute);
        const seconds = minutes * 60;
        const milliseconds = seconds * 1000;

        offsets.push(milliseconds);
      });
    });

    return offsets;
  };

  const convertOffsetsToWeekdaysAndTimes = (offsets) => {
    const weekdays = [false, false, false, false, false, false, false];
    const times = [];

    const MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
    const MILLISECONDS_IN_HOUR = 60 * 60 * 1000;
    const MILLISECONDS_IN_MINUTE = 60 * 1000;

    offsets.forEach((offset) => {
      const weekday = Math.floor(offset / MILLISECONDS_IN_DAY);
      const daily = offset % MILLISECONDS_IN_DAY;

      const hours = Math.floor(daily / MILLISECONDS_IN_HOUR);
      const hourly = daily % MILLISECONDS_IN_HOUR;

      const minutes = Math.floor(hourly / MILLISECONDS_IN_MINUTE);
      const time = moment(`${hours}:${minutes}`, "H:m").format("HH:mm");

      weekdays[weekday] = true;

      if (!times.includes(time)) {
        times.push(time);
      }
    });

    return [weekdays, times];
  };

  const handleSubmit = ({ title, weekdays, times, startDate, endDate }) => {
    const err = validate({ title, weekdays, times, startDate, endDate });

    if (err.title || err.weekdays || err.times || err.startDate || err.endDate) {
      setErrors(err);
    }

    const payload = {
      title,
      times: convertWeekdaysAndTimesToOffsets(weekdays, times),
      startDate,
      endDate,
      studyID: study.id,
      participantID: participant.id,
    };

    reminder
      ? firestore.collection("reminders").doc(reminder.id).update(payload)
      : firestore.collection("reminders").add(payload);
  };

  const handleDelete = () => {
    firestore.collection("reminders").doc(reminder.id).delete();
  };

  const handleCancel = handleInitial;

  const handleChange = (name, value) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  return [
    inputs,
    errors,
    handleAddTime,
    handleDeleteTime,
    handleToggleDay,
    handleChange,
    handleSubmit,
    handleDelete,
    handleCancel,
  ];
}

export { useReminder };
