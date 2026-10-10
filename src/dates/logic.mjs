function parseDate(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
    ? date
    : null;
}

export function dateBounds(today) {
  const date = parseDate(today);
  if (!date) throw new RangeError("Today must be a valid YYYY-MM-DD date.");
  const offset = (days) => {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result.toISOString().slice(0, 10);
  };
  return { min: offset(1), max: offset(60) };
}

export function validateDate(value, today) {
  const { min, max } = dateBounds(today);
  if (!value) return { valid: false, reason: "Choose a test date." };
  const date = parseDate(value);
  if (!date) return { valid: false, reason: "Choose a valid test date." };
  if (value < min || value > max) {
    return { valid: false, reason: "Choose a date from tomorrow to 60 days ahead." };
  }
  if (date.getUTCDay() === 0 || date.getUTCDay() === 6) {
    return { valid: false, reason: "Choose a weekday (Monday to Friday)." };
  }
  return { valid: true, reason: "" };
}
