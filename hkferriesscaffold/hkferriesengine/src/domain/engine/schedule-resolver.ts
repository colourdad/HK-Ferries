import type { ISODateString, PublicHoliday, Timetable } from "../models/timetable";
import type { ScheduleDayType } from "../models/schedule-day-type";
import type { RouteId, Direction } from "../models/route";
import type { SpecialOverride } from "../models/special-override";
import type { TimetableRepository } from "../ports/timetable-repository.port";
import { isPublicHoliday } from "./holiday-checker";

/**
 * Determines the ScheduleDayType for a given ISO date string.
 *
 * Priority order:
 * 1. Public holiday → PUBLIC_HOLIDAY
 * 2. Sunday         → SUNDAY
 * 3. Saturday       → SATURDAY
 * 4. Otherwise      → WEEKDAY
 *
 * Pure function — `date` is passed in, never read from system clock.
 * Date is parsed via UTC to avoid DST / timezone shifts affecting day-of-week.
 */
export function resolveScheduleDayType(
  date: ISODateString,
  holidays: readonly PublicHoliday[]
): ScheduleDayType {
  if (isPublicHoliday(date, holidays)) {
    return "PUBLIC_HOLIDAY";
  }

  // Parse YYYY-MM-DD components and use UTC to avoid local-timezone day shifts.
  const [yearStr, monthStr, dayStr] = date.split("-");
  const year = parseInt(yearStr!, 10);
  const month = parseInt(monthStr!, 10) - 1; // 0-indexed
  const day = parseInt(dayStr!, 10);

  // 0 = Sunday, 6 = Saturday
  const dayOfWeek = new Date(Date.UTC(year, month, day)).getUTCDay();

  if (dayOfWeek === 0) return "SUNDAY";
  if (dayOfWeek === 6) return "SATURDAY";
  return "WEEKDAY";
}

/**
 * Selects the applicable Timetable for a route/direction on a given date.
 *
 * Priority order:
 * 1. SpecialOverride whose date range covers the date (first match wins)
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
  // ISO date string lexicographic order matches chronological order,
  // so string comparison is safe for date range checks.
  const override = overrides.find(
    (o) =>
      o.routeId === routeId &&
      o.replacementTimetable.direction === direction &&
      o.dateRange.from <= date &&
      date <= o.dateRange.to
  );

  if (override) {
    return override.replacementTimetable;
  }

  const dayType = resolveScheduleDayType(date, holidays);
  return repository.getByRoute(routeId, direction, dayType);
}
