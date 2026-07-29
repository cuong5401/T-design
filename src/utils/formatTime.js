const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

function pad(value) {
  return String(value).padStart(2, "0");
}

export function formatClock(date) {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const dayOfMonth = date.getDate();
  const dayName = WEEKDAYS[date.getDay()];
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  return `${year}/${month}/${dayOfMonth}(${dayName}) ${hour}:${minute}:${second}`;
}
