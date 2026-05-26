import type { Route } from "../../domain/models/route";
import type { RouteRepository } from "../../domain/ports/route-repository.port";

export function getAllRoutes(routeRepository: RouteRepository): Route[] {
  // TODO: Add sorting / filtering options when route count grows
  return routeRepository.getAll();
}
