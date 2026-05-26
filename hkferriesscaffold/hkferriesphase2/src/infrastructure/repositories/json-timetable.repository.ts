import type { TimetableRepository } from "../../domain/ports/timetable-repository.port";
import type { RouteId, Direction } from "../../domain/models/route";
import type { ScheduleDayType } from "../../domain/models/schedule-day-type";
import type { Timetable } from "../../domain/models/timetable";
import type { SpecialOverride, DateRange } from "../../domain/models/special-override";
import { ALL_CENTRAL_CHEUNG_CHAU_TIMETABLES } from "../data/timetables/central-cheung-chau";

// TODO: Import additional route timetables as they are added in Phase 2+
// Pattern: import { ALL_CENTRAL_MUI_WO_TIMETABLES } from "../data/timetables/central-mui-wo";

const ALL_TIMETABLES: readonly Timetable[] = [
  ...ALL_CENTRAL_CHEUNG_CHAU_TIMETABLES,
  // TODO: spread additional route arrays here
];

const ALL_OVERRIDES: readonly SpecialOverride[] = [
  // TODO: Add special overrides (typhoon arrangements, festive schedules) as sourced
];

export class JsonTimetableRepository implements TimetableRepository {
  getByRoute(
    routeId: RouteId,
    direction: Direction,
    dayType: ScheduleDayType
  ): Timetable | null {
    // Find the most recently valid timetable for this combination.
    // If multiple timetables match (e.g. after a schedule revision), the one
    // with the latest validFrom that is still in effect takes priority.
    return (
      ALL_TIMETABLES.filter(
        (t) =>
          t.routeId === routeId &&
          t.direction === direction &&
          t.dayType === dayType
      ).at(-1) ?? null
    );
  }

  getOverrides(routeId: RouteId, dateRange: DateRange): SpecialOverride[] {
    return ALL_OVERRIDES.filter(
      (o) =>
        o.routeId === routeId &&
        o.dateRange.from <= dateRange.to &&
        o.dateRange.to >= dateRange.from
    );
  }
}
