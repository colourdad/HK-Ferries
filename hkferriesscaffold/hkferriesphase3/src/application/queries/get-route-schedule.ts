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
  const route = routeRepository.getById(routeId);
  if (!route) return null;

  return {
    route,
    direction,
    weekday:       timetableRepository.getByRoute(routeId, direction, "WEEKDAY"),
    saturday:      timetableRepository.getByRoute(routeId, direction, "SATURDAY"),
    sunday:        timetableRepository.getByRoute(routeId, direction, "SUNDAY"),
    publicHoliday: timetableRepository.getByRoute(routeId, direction, "PUBLIC_HOLIDAY"),
  };
}
