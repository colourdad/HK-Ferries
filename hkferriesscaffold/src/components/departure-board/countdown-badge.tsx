import type { TimeOfDay } from "../../domain/models/departure";

interface CountdownBadgeProps {
  departureTime: TimeOfDay;
}

// TODO: Implement in Phase 4
// - Use useCountdown hook to get live minutesRemaining
// - Show "Boarding" when isBoarding is true
// - Show "Departed" when isDeparted is true
// - Colour-code: green > 10 min, amber 5–10 min, red < 5 min
export function CountdownBadge({ departureTime }: CountdownBadgeProps) {
  void departureTime;
  return null;
}
