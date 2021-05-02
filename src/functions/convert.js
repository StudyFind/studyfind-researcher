import moment from "moment";

function datetimeToTimestamp(date, time) {
  return moment(`${date} ${time}`, "YYYY-MM-DD h:mma").utc().valueOf();
}

function timestampToDate(timestamp, timezone) {
  return moment(timestamp).tz(timezone).format("LL");
}

function timestampToTime(timestamp, timezone) {
  return moment(timestamp).tz(timezone).format("h:mma");
}

export default { datetimeToTimestamp, timestampToDate, timestampToTime };
