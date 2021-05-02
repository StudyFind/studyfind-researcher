import moment from "moment";

/*
==============================================================================
Database Formats
------------------------------------------------------------------------------
Always store dates in the database in the format "YYYY-MM-DD"
Always store times in the database as unix timestamps
==============================================================================

==============================================================================
Parameter Formats
------------------------------------------------------------------------------
timestamp => unix timestamp in milliseconds  Example: 1619834416000
timezone => item from moment-timezone list   Example: "America/New_York"
time => 12 hour format with meridian         Example: "9:49pm"
date => YYYY-MM-DD format                    Example: "2021-04-30"
==============================================================================
*/

const getNow = (timezone) => {
  // returns present unix timestamp in given timezone
  return moment.utc().tz(timezone).valueOf();
};

const getNowUTC = () => {
  // returns present unix timestamp in utc
  return moment.utc().valueOf();
};

const getToday = (timezone) => {
  // returns present unix timestamp in utc
  return moment.utc().tz(timezone).format("YYYY-MM-DD");
};

const getYesterday = (timezone) => {
  return moment.utc().tz(timezone).add(-1, "days").format("YYYY-MM-DD");
};

const getTomorrow = (timezone) => {
  return moment.utc().tz(timezone).add(1, "days").format("YYYY-MM-DD");
};

const getStandardDate = (timestamp, timezone) => {
  return moment.utc(timestamp).tz(timezone).format("YYYY-MM-DD");
};

const getFriendlyDate = (timestamp, timezone) => {
  const standardDate = getStandardDate(timestamp, timezone);

  const today = getToday(timezone);
  const tomorrow = getTomorrow(timezone);
  const yesterday = getYesterday(timezone);

  if (standardDate === today) return "Today";
  if (standardDate === tomorrow) return "Tomorrow";
  if (standardDate === yesterday) return "Yesterday";

  return moment.utc(timestamp).tz(timezone).format("LL");
};

const get12HourTime = (timestamp, timezone) => {
  return moment.utc(timestamp).tz(timezone).format("h:mma");
};

const get24HourTime = (timestamp, timezone) => {
  return moment.utc(timestamp).tz(timezone).format("HH:mma");
};

const getRelativeTime = (timestamp, timezone) => {
  return moment.utc(timestamp).tz(timezone).fromNow();
};

const getStandardTimezoneName = (timezone) => {
  return moment.tz(timezone).zoneAbbr();
};

const getTimestampFromDatetime = (time, date, timezone) => {
  return moment(`${time} ${date}`, "h:mma YYYY-MM-DD").tz(timezone).utc().valueOf();
};

export default {
  getNow,
  getNowUTC,
  getToday,
  getYesterday,
  getTomorrow,
  getFriendlyDate,
  get12HourTime,
  get24HourTime,
  getRelativeTime,
  getStandardTimezoneName,
  getTimestampFromDatetime,
};
