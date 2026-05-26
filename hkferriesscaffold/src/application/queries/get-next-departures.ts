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
  /** Null when no applicable timetable exists for this route/day combination */
  timetableFound: boolean;
}

export function getNextDepartures(
  input: GetNextDeparturesInput,
  timetableRepository: TimetableRepository,
  holidayRepository: HolidayRepository
): GetNextDeparturesOutput {
  // TODO: Implement
  // - Fetch holidays for the year of `date`
  // - Call resolveApplicableTimetable
  // - Call getUpcomingDepartures with input.count ?? HOME_DEPARTURE_COUNT
  void input;
  void timetableRepository;
  void holidayRepository;
  void HOME_DEPARTURE_COUNT;
  void resolveApplicableTimetable;
  void getUpcomingDepartures;
  throw new Error("Not implemented");
}
