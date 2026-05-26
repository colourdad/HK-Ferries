import type { Route, RouteId } from "../models/route";

export interface RouteRepository {
  getAll(): Route[];
  getById(id: RouteId): Route | null;
}
