import moment from "moment";

function formatDate(date) {
  const format = (m) => m.format("YYYY-MM-DD");

  const day = format(moment(date));
  const today = format(moment());
  const tomorrow = format(moment().add(1, "days"));
  const yesterday = format(moment().add(-1, "days"));

  if (day === today) return "Today";
  if (day === tomorrow) return "Tomorrow";
  if (day === yesterday) return "Yesterday";
  return moment(date).format("LL");
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
