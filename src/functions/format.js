import moment from "moment";

function date(date) {
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

function time(value) {
  return moment(value, "HH:mm").format("h:mma");
}

export default { date, time };
