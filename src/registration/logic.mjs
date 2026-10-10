export function validateRegistration(value) {
  const registration = value.trim().toUpperCase().replace(/\s+/g, " ");
  const valid = /^[A-Z]{2}[0-9]{2} [A-Z]{3}$/.test(registration);
  const reason = valid
    ? ""
    : registration === ""
      ? "Enter a registration number."
      : "Use two letters, two digits, a space and three letters (AB12 CDE is a made-up example).";

  return { registration, valid, reason };
}
