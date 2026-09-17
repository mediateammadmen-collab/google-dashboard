// Week numbering anchor: Week 1 starts here. Weeks after it count up (2, 3, ...),
// weeks before it count down (-1, -2, ...) - there's no "week 0".
const WEEK_1_START = "2026-09-26";
const WEEK_LENGTH_DAYS = 7;

function addDays(dateStr, days) {
  const d = new Date(`${dateStr}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

export function weekRange(weekNumber) {
  const offset = weekNumber > 0 ? weekNumber - 1 : weekNumber;
  const start = addDays(WEEK_1_START, offset * WEEK_LENGTH_DAYS);
  const end = addDays(start, WEEK_LENGTH_DAYS - 1);
  return { start, end };
}

export function describeWeek(weekNumber) {
  const { start, end } = weekRange(weekNumber);
  return { weekNumber, start, end };
}

function formatShortDate(dateStr) {
  return new Date(`${dateStr}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function weekOptionLabel(weekNumber) {
  const { start, end } = weekRange(weekNumber);
  return `Week ${weekNumber} · ${formatShortDate(start)} – ${formatShortDate(end)}`;
}

// Selectable weeks for the picker: `span` weeks back and forward from Week 1.
export function listWeekNumbers(span = 12) {
  const weeks = [];
  for (let i = span; i >= 1; i--) weeks.push(-i);
  for (let i = 1; i <= span; i++) weeks.push(i);
  return weeks;
}
