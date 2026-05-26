import type { RouteRepository } from "../../domain/ports/route-repository.port";
import type { Route, RouteId } from "../../domain/models/route";
import { ROUTES } from "../data/routes";

export class JsonRouteRepository implements RouteRepository {
  getAll(): Route[] {
    return [...ROUTES];
  }

  getById(id: RouteId): Route | null {
    return ROUTES.find((route) => route.id === id) ?? null;
  }
}
