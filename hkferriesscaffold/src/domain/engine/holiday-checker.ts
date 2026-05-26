import type { ISODateString, PublicHoliday } from "../models/timetable";

/**
 * Returns true if the given date is present in the provided holiday list.
 * Pure function — no I/O, no Date.now().
 */
export function isPublicHoliday(
  date: ISODateString,
  holidays: readonly PublicHoliday[]
): boolean {
  // TODO: Implement
  void date;
  void holidays;
  throw new Error("Not implemented");
}
