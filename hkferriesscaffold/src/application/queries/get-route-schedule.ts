import type { Route, RouteId, Direction } from "../../domain/models/route";
import type { Timetable } from "../../domain/models/timetable";
import type { RouteRepository } from "../../domain/ports/route-repository.port";
import type { TimetableRepository } from "../../domain/ports/timetable-repository.port";

export interface RouteScheduleView {
  route: Route;
  direction: Direction;
  weekday: Timetable | null;
  saturday: Timetable | null;
  sunday: Timetable | null;
  publicHoliday: Timetable | null;
}

export function getRouteSchedule(
  routeId: RouteId,
  direction: Direction,
  routeRepository: RouteRepository,
  timetableRepository: TimetableRepository
): RouteScheduleView | null {
  // TODO: Implement
  // - Look up route, return null if not found
  // - Fetch all four day-type timetables (some may be null if not defined)
  void routeId;
  void direction;
  void routeRepository;
  void timetableRepository;
  throw new Error("Not implemented");
}
