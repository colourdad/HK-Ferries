import type { RouteId, Direction } from "../../domain/models/route";
import type { TimeOfDay } from "../../domain/models/departure";
import type { ISODateString } from "../../domain/models/timetable";
import type { DepartureResult } from "../../domain/engine/schedule-engine";
import type { TimetableRepository } from "../../domain/ports/timetable-repository.port";
import type { HolidayRepository } from "../../domain/ports/holiday-repository.port";
import { resolveApplicableTimetable } from "../../domain/engine/schedule-resolver";
import { getUpcomingDepartures } from "../../domain/engine/schedule-engine";
import { HOME_DEPARTURE_COUNT } from "../../lib/constants";

export interface GetNextDeparturesInput {
  routeId: RouteId;
  direction: Direction;
  /** ISO date of the day being queried — e.g. "2025-06-01" */
  date: ISODateString;
  /** Current wall-clock time in HK, expressed as TimeOfDay */
  currentTime: TimeOfDay;
  count?: number;
}

export interface GetNextDeparturesOutput {
  departures: DepartureResult[];
  timetableFound: boolean;
}

export function getNextDepartures(
  input: GetNextDeparturesInput,
  timetableRepository: TimetableRepository,
  holidayRepository: HolidayRepository
): GetNextDeparturesOutput {
  const year = parseInt(input.date.slice(0, 4), 10);
  const holidays = holidayRepository.getByYear(year);
  const overrides = timetableRepository.getOverrides(input.routeId, {
    from: input.date,
    to: input.date,
  });

  const timetable = resolveApplicableTimetable(
    input.routeId,
    input.direction,
    input.date,
    holidays,
    overrides,
    timetableRepository
  );

  if (!timetable) {
    return { departures: [], timetableFound: false };
  }

  const departures = getUpcomingDepartures(
    timetable,
    input.currentTime,
    input.count ?? HOME_DEPARTURE_COUNT
  );

  return { departures, timetableFound: true };
}
