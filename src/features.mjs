// Each feature owns exactly one slot below. To add a feature, replace the null on
// your slot's line with a dynamic import of your view module. Do not touch any other slot.

export const features = {
  // Slot 1: registration validation
  slot1: null,

  // Slot 2: date rules
  slot2: null,

  // Slot 3: test centre finder
  slot3: null,

  // Slot 4: fee calculator
  slot4: null,

  // Slot 5: booking confirmation
  slot5: null,

  // Slot 6: calendar file
  slot6: () => import("./calendar/view.mjs"),

  // Slot 7: booking history
  slot7: null,

  // Slot 8: design and accessibility
  slot8: null,
};
