import type { RouteId, Direction } from "../models/route";
import type { ScheduleDayType } from "../models/schedule-day-type";
import type { Timetable } from "../models/timetable";
import type { SpecialOverride, DateRange } from "../models/special-override";

export interface TimetableRepository {
  getByRoute(
    routeId: RouteId,
    direction: Direction,
    dayType: ScheduleDayType
  ): Timetable | null;

  /** Returns any active special overrides that overlap the given date range */
  getOverrides(routeId: RouteId, dateRange: DateRange): SpecialOverride[];
}
