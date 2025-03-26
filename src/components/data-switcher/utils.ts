export const DATES = [
  { name: "1m", value: 30, interval: 1, intervals: 30 },
  { name: "6m", value: 180, interval: 7, intervals: 26 },
  { name: "1y", value: 365, interval: 7, intervals: 52 }
];

export const DATESEarned = [
  { name: "1m", value: 30, interval: 1, intervals: 30 },
  { name: "3m", value: 90, interval: 7, intervals: Math.floor(90 / 7), isDisabled: true },
  { name: "6m", value: 180, interval: 7, intervals: 26, isDisabled: true }
];

export const FREEZE_DATES = ["1y"];
