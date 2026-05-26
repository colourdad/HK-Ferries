import type { TimetableRepository } from "../../domain/ports/timetable-repository.port";
import type { RouteId, Direction } from "../../domain/models/route";
import type { ScheduleDayType } from "../../domain/models/schedule-day-type";
import type { Timetable } from "../../domain/models/timetable";
import type { SpecialOverride, DateRange } from "../../domain/models/special-override";

// TODO: Import timetable data files as they are populated in Phase 2.
// Pattern: import { CENTRAL_CHEUNG_CHAU_TIMETABLES } from "../data/timetables/central-cheung-chau";

const ALL_TIMETABLES: readonly Timetable[] = [
  // TODO: Populate in Phase 2
];

const ALL_OVERRIDES: readonly SpecialOverride[] = [
  // TODO: Populate special overrides as they are sourced
];

export class JsonTimetableRepository implements TimetableRepository {
  getByRoute(
    routeId: RouteId,
    direction: Direction,
    dayType: ScheduleDayType
  ): Timetable | null {
    // TODO: Implement date-range validation (validFrom / validUntil)
    return (
      ALL_TIMETABLES.find(
        (t) =>
          t.routeId === routeId &&
          t.direction === direction &&
          t.dayType === dayType
      ) ?? null
    );
  }

  getOverrides(routeId: RouteId, dateRange: DateRange): SpecialOverride[] {
    // TODO: Implement date-range overlap check
    void dateRange;
    return ALL_OVERRIDES.filter((o) => o.routeId === routeId);
  }
}
