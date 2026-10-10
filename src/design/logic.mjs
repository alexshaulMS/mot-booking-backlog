function channels(colour) {
  if (typeof colour !== "string") throw new TypeError("Colours must be hexadecimal strings.");
  let hex = colour.trim().replace(/^#/, "");
  if (/^[\da-f]{3}$/i.test(hex)) {
    hex = [...hex].map((channel) => channel + channel).join("");
  }
  if (!/^[\da-f]{6}$/i.test(hex)) {
    throw new TypeError("Colours must use #RGB or #RRGGBB hexadecimal notation.");
  }
  return [0, 2, 4].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
}

function luminance(colour) {
  const linear = channels(colour).map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function hasAaContrast(foreground, background) {
  const contrast = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (contrast[0] + 0.05) / (contrast[1] + 0.05) >= 4.5;
}
