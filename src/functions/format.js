// import moment from "moment";

// function formatDate(date) {
//   const isYesterday = moment(date) === moment().add(-1, "days");
//   const isToday = moment(date) === moment();
//   const isTomorrow = moment(date) === moment().add(-1, "days");

//   if (isYesterday) return "Yesterday";
//   if (isToday) return "Today";
//   if (isTomorrow) return "Tomorrow";
//   return moment(date).format("LL");
// }

// export default { date: formatDate };

function formatDate(value) {
  const date = new Date(value);
  const year = parseInt(date.getFullYear());
  const month = parseInt(date.getMonth());
  const day = date.getDate();

  const MONTHS = [
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

  return `${MONTHS[month]} ${day}, ${year}`;
}

function formatTime(value) {
  const [hours, minutes] = value.split(":");
  const hours12 = hours % 12 || 12;
  const hoursPad = hours < 10 ? "0" : "";
  const minutesPad = minutes < 10 ? "0" : "";
  const meridian = hours < 12 ? "am" : "pm";
  return `${hoursPad}${hours12}:${minutesPad}${minutes}${meridian}`;
}

export default { date: formatDate, time: formatTime };
