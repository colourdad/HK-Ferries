"use client";

import { useState, useEffect } from "react";
import type { TimeOfDay } from "../../domain/models/departure";
import { calculateCountdown } from "../../domain/engine/schedule-engine";
import { HK_TIMEZONE, COUNTDOWN_REFRESH_INTERVAL_MS } from "../../lib/constants";
import { toISODateString } from "../../domain/models/timetable";

const BOARDING_THRESHOLD_MINUTES = 5;

export interface UseCountdownResult {
  minutesRemaining: number;
  isBoarding: boolean;
  isDeparted: boolean;
}

function getCurrentHKTime(): TimeOfDay {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: HK_TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    parseInt(parts.find((p) => p.type === type)?.value ?? "0", 10);

  return { hours: get("hour"), minutes: get("minute") };
}

// toISODateString imported only to keep the module's branded-type contract
// consistent — not used at runtime in this hook.
void toISODateString;

/**
 * Live countdown to a fixed departure time.
 * Re-calculates every COUNTDOWN_REFRESH_INTERVAL_MS milliseconds.
 */
export function useCountdown(departureTime: TimeOfDay): UseCountdownResult {
  const calculate = (): UseCountdownResult => {
    const mins = calculateCountdown(departureTime, getCurrentHKTime());
    return {
      minutesRemaining: mins,
      isBoarding: mins >= 0 && mins <= BOARDING_THRESHOLD_MINUTES,
      isDeparted: mins < 0,
    };
  };

  const [result, setResult] = useState<UseCountdownResult>(calculate);

  useEffect(() => {
    setResult(calculate());
    const id = setInterval(() => setResult(calculate()), COUNTDOWN_REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
    // departureTime is a value object — safe to omit from deps if caller memoises it,
    // but including hours/minutes directly makes the lint rule happy.
  }, [departureTime.hours, departureTime.minutes]); // eslint-disable-line react-hooks/exhaustive-deps

  return result;
}
