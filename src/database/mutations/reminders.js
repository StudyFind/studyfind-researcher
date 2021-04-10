import { firestore } from "database/firebase";
import moment from "moment";

const checker = (name, value) => {
  if (!value) return true;

  if (name === "times" && !value.length) {
    return "Please add at least one time";
  }

  if (name === "weekdays" && !value.length) {
    return "Please choose at least one day";
  }

  return false;
};

const validate = ({ title, weekdays, times, startDate, endDate }) => ({
  title: checker("title", title),
  times: checker("times", times),
  weekdays: checker("weekdays", weekdays),
  startDate: checker("startDate", startDate),
  endDate: checker("endDate", endDate),
});

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

const createReminder = async ({ title, weekdays, times, startDate, endDate }) => {
  const errors = validate({ title, weekdays, times, startDate, endDate });

  if (errors.title || errors.weekdays || errors.times || errors.startDate || errors.endDate) {
    throw errors;
  }

  if (moment(startDate).isAfter(endDate, "day")) {
    throw { ...errors, endDate: "End date must be after start date" };
  }

  await firestore.collection("reminders").add({
    title,
    times: convertWeekdaysAndTimesToOffsets(),
    startDate,
    endDate,
    // participantID: participant.id,
    // studyID: study.id,
  });
};

const updateReminder = async (reminderID, { name, date, time, link }) => {};

const deleteReminder = async (reminderID) => {};

export { createReminder, updateReminder, deleteReminder, convertOffsetsToWeekdaysAndTimes };
