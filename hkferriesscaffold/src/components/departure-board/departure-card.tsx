import type { DepartureResult } from "../../domain/engine/schedule-engine";

interface DepartureCardProps {
  departure: DepartureResult;
}

// TODO: Implement in Phase 4
// - Display formatted departure time (HH:MM)
// - Show fastFerry badge if applicable
// - Embed CountdownBadge
// - Show notes if present
export function DepartureCard({ departure }: DepartureCardProps) {
  void departure;
  return null;
}
