import type { Route, RouteId } from "../../domain/models/route";

interface RouteSelectorProps {
  routes: Route[];
  selectedRouteId: RouteId | null;
  onSelect: (routeId: RouteId) => void;
}

// TODO: Implement in Phase 4
// - Render routes as a scrollable list or bottom sheet
// - Highlight selected route
// - Support search/filter when route count grows
export function RouteSelector({
  routes,
  selectedRouteId,
  onSelect,
}: RouteSelectorProps) {
  void routes;
  void selectedRouteId;
  void onSelect;
  return null;
}
