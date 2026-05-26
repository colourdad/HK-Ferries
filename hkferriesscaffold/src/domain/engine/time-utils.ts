import type { TimeOfDay } from "../models/departure";

/**
 * Converts a TimeOfDay to total minutes since midnight.
 * Used as a comparable integer for sorting and arithmetic.
 */
export function toMinutesSinceMidnight(time: TimeOfDay): number {
  // TODO: Implement
  void time;
  throw new Error("Not implemented");
}

/**
 * Converts total minutes since midnight back to a TimeOfDay.
 * Input must be in range [0, 1439].
 */
export function fromMinutesSinceMidnight(totalMinutes: number): TimeOfDay {
  // TODO: Implement
  void totalMinutes;
  throw new Error("Not implemented");
}

/**
 * Returns the difference in minutes from `from` to `to`.
 * Result is always positive — if `to` is earlier than `from`, assumes next-day crossing.
 */
export function minutesBetween(from: TimeOfDay, to: TimeOfDay): number {
  // TODO: Implement with midnight-crossing support
  void from;
  void to;
  throw new Error("Not implemented");
}

/** Formats a TimeOfDay as HH:MM (24-hour). */
export function formatTime(time: TimeOfDay): string {
  // TODO: Implement
  void time;
  throw new Error("Not implemented");
}

/** Parses a "HH:MM" string into a TimeOfDay. Throws on invalid input. */
export function parseTime(value: string): TimeOfDay {
  // TODO: Implement with validation
  void value;
  throw new Error("Not implemented");
}
