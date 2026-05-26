import type { RouteId, Direction } from "../../domain/models/route";

interface DepartureListProps {
  routeId: RouteId;
  direction: Direction;
}

// TODO: Implement in Phase 4
// - Use useNextDeparture hook to fetch departures
// - Render loading skeleton while fetching
// - Render DepartureCard for each result
// - Show "No more departures today" when list is empty
export function DepartureList({ routeId, direction }: DepartureListProps) {
  void routeId;
  void direction;
  return null;
}
