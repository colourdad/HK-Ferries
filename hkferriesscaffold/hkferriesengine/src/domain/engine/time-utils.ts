import type { TimeOfDay } from "../models/departure";

/**
 * Converts a TimeOfDay to total minutes since midnight.
 * Used as a comparable integer for sorting and arithmetic.
 */
export function toMinutesSinceMidnight(time: TimeOfDay): number {
  return time.hours * 60 + time.minutes;
}

/**
 * Converts total minutes since midnight back to a TimeOfDay.
 * Input must be in range [0, 1439].
 */
export function fromMinutesSinceMidnight(totalMinutes: number): TimeOfDay {
  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  };
}

/**
 * Returns the difference in minutes from `from` to `to`.
 * Result is always non-negative — if `to` is earlier than `from`,
 * assumes a next-day midnight crossing and wraps accordingly.
 */
export function minutesBetween(from: TimeOfDay, to: TimeOfDay): number {
  const diff =
    toMinutesSinceMidnight(to) - toMinutesSinceMidnight(from);
  return diff >= 0 ? diff : diff + 1440;
}

/** Formats a TimeOfDay as HH:MM (24-hour, zero-padded). */
export function formatTime(time: TimeOfDay): string {
  const hh = String(time.hours).padStart(2, "0");
  const mm = String(time.minutes).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** Parses a "HH:MM" string into a TimeOfDay. Throws on invalid input. */
export function parseTime(value: string): TimeOfDay {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value);
  if (!match) {
    throw new Error(`Invalid time format: "${value}". Expected HH:MM.`);
  }
  const hours = parseInt(match[1]!, 10);
  const minutes = parseInt(match[2]!, 10);
  if (hours > 23 || minutes > 59) {
    throw new Error(`Invalid time value: "${value}".`);
  }
  return { hours, minutes };
}
