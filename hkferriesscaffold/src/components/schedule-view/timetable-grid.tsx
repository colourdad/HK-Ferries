import type { Timetable } from "../../domain/models/timetable";

interface TimetableGridProps {
  timetable: Timetable;
}

// TODO: Implement in Phase 4
// - Display all departures in a responsive grid
// - Group by hour for readability
// - Highlight the next upcoming departure
// - Show fast-ferry indicator per row
export function TimetableGrid({ timetable }: TimetableGridProps) {
  void timetable;
  return null;
}
