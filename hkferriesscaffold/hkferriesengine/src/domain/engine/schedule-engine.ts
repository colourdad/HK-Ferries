import type { DepartureTime, TimeOfDay } from "../models/departure";
import type { Timetable } from "../models/timetable";
import { toMinutesSinceMidnight } from "./time-utils";

/** Returned by next/previous departure lookups */
export interface DepartureResult {
  readonly departure: DepartureTime;
  readonly countdownMinutes: number;
}

/**
 * Finds the next departure at or after `referenceTime`.
 * Returns null if no departure exists at or after that time in the timetable.
 *
 * Pure function — referenceTime must be supplied by the caller, never from Date.now().
 */
export function getNextDeparture(
  timetable: Timetable,
  referenceTime: TimeOfDay
): DepartureResult | null {
  const refMins = toMinutesSinceMidnight(referenceTime);

  for (const departure of timetable.departures) {
    const depMins = toMinutesSinceMidnight(departure.time);
    if (depMins >= refMins) {
      return {
        departure,
        countdownMinutes: depMins - refMins,
      };
    }
  }

  return null;
}

/**
 * Finds the most recent departure strictly before `referenceTime`.
 * Returns null if no departure exists before that time in the timetable.
 */
export function getPreviousDeparture(
  timetable: Timetable,
  referenceTime: TimeOfDay
): DepartureResult | null {
  const refMins = toMinutesSinceMidnight(referenceTime);
  let result: DepartureResult | null = null;

  for (const departure of timetable.departures) {
    const depMins = toMinutesSinceMidnight(departure.time);
    if (depMins < refMins) {
      result = {
        departure,
        countdownMinutes: depMins - refMins, // negative — already departed
      };
    }
  }

  return result;
}

/**
 * Returns the first departure of the day from a timetable.
 * Returns null if the timetable has no departures.
 */
export function getFirstDeparture(timetable: Timetable): DepartureTime | null {
  return timetable.departures[0] ?? null;
}

/**
 * Returns the last departure of the day from a timetable.
 * Returns null if the timetable has no departures.
 */
export function getLastDeparture(timetable: Timetable): DepartureTime | null {
  return timetable.departures[timetable.departures.length - 1] ?? null;
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
  const refMins = toMinutesSinceMidnight(referenceTime);
  const results: DepartureResult[] = [];

  for (const departure of timetable.departures) {
    if (results.length >= count) break;
    const depMins = toMinutesSinceMidnight(departure.time);
    if (depMins >= refMins) {
      results.push({ departure, countdownMinutes: depMins - refMins });
    }
  }

  return results;
}

/**
 * Calculates the countdown in whole minutes from `referenceTime` to `departureTime`.
 * Returns a negative value if the departure is in the past.
 */
export function calculateCountdown(
  departureTime: TimeOfDay,
  referenceTime: TimeOfDay
): number {
  return (
    toMinutesSinceMidnight(departureTime) -
    toMinutesSinceMidnight(referenceTime)
  );
}
