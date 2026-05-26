import { JsonRouteRepository } from "../infrastructure/repositories/json-route.repository";
import { JsonTimetableRepository } from "../infrastructure/repositories/json-timetable.repository";
import { JsonHolidayRepository } from "../infrastructure/repositories/json-holiday.repository";
import type { RouteRepository } from "../domain/ports/route-repository.port";
import type { TimetableRepository } from "../domain/ports/timetable-repository.port";
import type { HolidayRepository } from "../domain/ports/holiday-repository.port";

/**
 * Central service locator. All application-layer code imports repositories
 * from here rather than directly instantiating infrastructure classes.
 *
 * To swap an implementation (e.g. replace JSON files with a database),
 * only this file needs to change.
 *
 * TODO: Consider a proper DI container (e.g. tsyringe) if complexity grows.
 */

let routeRepository: RouteRepository | null = null;
let timetableRepository: TimetableRepository | null = null;
let holidayRepository: HolidayRepository | null = null;

export function getRouteRepository(): RouteRepository {
  routeRepository ??= new JsonRouteRepository();
  return routeRepository;
}

export function getTimetableRepository(): TimetableRepository {
  timetableRepository ??= new JsonTimetableRepository();
  return timetableRepository;
}

export function getHolidayRepository(): HolidayRepository {
  holidayRepository ??= new JsonHolidayRepository();
  return holidayRepository;
}

/** Resets all singletons — intended for use in tests only. */
export function _resetContainer(): void {
  routeRepository = null;
  timetableRepository = null;
  holidayRepository = null;
}
