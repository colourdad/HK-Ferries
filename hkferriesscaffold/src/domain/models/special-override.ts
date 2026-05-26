import type { RouteId } from "./route";
import type { ISODateString, Timetable } from "./timetable";

export interface DateRange {
  readonly from: ISODateString;
  readonly to: ISODateString;
}

/**
 * A one-off timetable replacement for a specific date range.
 * Takes precedence over the standard weekday/saturday/sunday/holiday schedule.
 * Used for typhoon arrangements, special event sailings, etc.
 */
export interface SpecialOverride {
  readonly id: string;
  readonly routeId: RouteId;
  readonly dateRange: DateRange;
  readonly description: string;
  readonly replacementTimetable: Timetable;
}
