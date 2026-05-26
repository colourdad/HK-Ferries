import type { DepartureTime, TimeOfDay } from "../models/departure";
import type { Timetable } from "../models/timetable";

/** Returned by next/previous departure lookups */
export interface DepartureResult {
  readonly departure: DepartureTime;
  readonly countdownMinutes: number;
}

/**
 * Finds the next departure at or after `referenceTime`.
 * Returns null if no departure exists after that time in the timetable.
 *
 * Pure function — referenceTime must be supplied by the caller, never from Date.now().
 */
export function getNextDeparture(
  timetable: Timetable,
  referenceTime: TimeOfDay
): DepartureResult | null {
  // TODO: Implement
  // - Filter departures to those >= referenceTime
  // - Return earliest with countdown calculation
  void timetable;
  void referenceTime;
  throw new Error("Not implemented");
}

/**
 * Finds the most recent departure strictly before `referenceTime`.
 * Returns null if no departure exists before that time in the timetable.
 */
export function getPreviousDeparture(
  timetable: Timetable,
  referenceTime: TimeOfDay
): DepartureResult | null {
  // TODO: Implement
  void timetable;
  void referenceTime;
  throw new Error("Not implemented");
}

/**
 * Returns the first departure of the day from a timetable.
 * Returns null if the timetable has no departures.
 */
export function getFirstDeparture(timetable: Timetable): DepartureTime | null {
  // TODO: Implement
  void timetable;
  throw new Error("Not implemented");
}

/**
 * Returns the last departure of the day from a timetable.
 * Returns null if the timetable has no departures.
 */
export function getLastDeparture(timetable: Timetable): DepartureTime | null {
  // TODO: Implement
  void timetable;
  throw new Error("Not implemented");
}

/**
 * Returns up to `count` upcoming departures at or after `referenceTime`.
 * Returns an empty array if none exist.
 */
export function getUpcomingDepartures(
  timetable: Timetable,
  referenceTime: TimeOfDay,
  count: number
): DepartureResult[] {
  // TODO: Implement
  void timetable;
  void referenceTime;
  void count;
  throw new Error("Not implemented");
}

/**
 * Calculates the countdown in whole minutes from `referenceTime` to `departureTime`.
 * Returns a negative value if the departure is in the past.
 */
export function calculateCountdown(
  departureTime: TimeOfDay,
  referenceTime: TimeOfDay
): number {
  // TODO: Implement using time-utils.minutesBetween
  void departureTime;
  void referenceTime;
  throw new Error("Not implemented");
}
