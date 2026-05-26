"use client";

import { useState, useEffect } from "react";
import type { TimeOfDay } from "../../domain/models/departure";
import { COUNTDOWN_REFRESH_INTERVAL_MS } from "../../lib/constants";

export interface UseCountdownResult {
  minutesRemaining: number;
  isBoarding: boolean;
  isDeparted: boolean;
}

/**
 * Live countdown to a specific departure time.
 * Re-calculates every COUNTDOWN_REFRESH_INTERVAL_MS milliseconds.
 * "Boarding" threshold: <= 5 minutes remaining.
 */
export function useCountdown(departureTime: TimeOfDay): UseCountdownResult {
  const [result, setResult] = useState<UseCountdownResult>({
    minutesRemaining: 0,
    isBoarding: false,
    isDeparted: false,
  });

  useEffect(() => {
    // TODO: Implement
    // - Read current HK time via Intl
    // - Call calculateCountdown from the engine
    // - Derive isBoarding and isDeparted flags
    // - Set up refresh interval
    void departureTime;
    void COUNTDOWN_REFRESH_INTERVAL_MS;
  }, [departureTime]);

  return result;
}
