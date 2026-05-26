export type { DepartureResult } from "./schedule-engine";
export {
  getNextDeparture,
  getPreviousDeparture,
  getFirstDeparture,
  getLastDeparture,
  getUpcomingDepartures,
  calculateCountdown,
} from "./schedule-engine";

export { resolveScheduleDayType, resolveApplicableTimetable } from "./schedule-resolver";
export { isPublicHoliday } from "./holiday-checker";
export {
  toMinutesSinceMidnight,
  fromMinutesSinceMidnight,
  minutesBetween,
  formatTime,
  parseTime,
} from "./time-utils";
