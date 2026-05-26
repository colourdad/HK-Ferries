import type { ISODateString, PublicHoliday, Timetable } from "../models/timetable";
import type { ScheduleDayType } from "../models/schedule-day-type";
import type { RouteId, Direction } from "../models/route";
import type { SpecialOverride } from "../models/special-override";
import type { TimetableRepository } from "../ports/timetable-repository.port";

/**
 * Determines the ScheduleDayType for a given ISO date string.
 *
 * Priority order:
 * 1. Public holiday → PUBLIC_HOLIDAY
 * 2. Sunday → SUNDAY
 * 3. Saturday → SATURDAY
 * 4. Otherwise → WEEKDAY
 *
 * Pure function — `date` is passed in, never read from system clock.
 */
export function resolveScheduleDayType(
  date: ISODateString,
  holidays: readonly PublicHoliday[]
): ScheduleDayType {
  // TODO: Implement
  // - Check holidays list first (public holidays override day-of-week)
  // - Parse date to determine day of week
  void date;
  void holidays;
  throw new Error("Not implemented");
}

/**
 * Selects the applicable Timetable for a route/direction on a given date.
 *
 * Priority order:
 * 1. SpecialOverride covering the date (most recent validFrom wins if multiple)
 * 2. Standard timetable for the resolved ScheduleDayType
 *
 * Returns null if no timetable exists for the combination.
 */
export function resolveApplicableTimetable(
  routeId: RouteId,
  direction: Direction,
  date: ISODateString,
  holidays: readonly PublicHoliday[],
  overrides: readonly SpecialOverride[],
  repository: TimetableRepository
): Timetable | null {
  // TODO: Implement
  // - Check for special overrides covering this date first
  // - Fall back to resolveScheduleDayType → repository.getByRoute
  void routeId;
  void direction;
  void date;
  void holidays;
  void overrides;
  void repository;
  throw new Error("Not implemented");
}
