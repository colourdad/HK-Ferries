"use client";

import { useState, useEffect, useCallback } from "react";
import type { RouteId, Direction } from "../../domain/models/route";
import type { DepartureResult } from "../../domain/engine/schedule-engine";
import { getNextDepartures } from "../queries/get-next-departures";
import {
  getRouteRepository,
  getTimetableRepository,
  getHolidayRepository,
} from "../../lib/container";
import {
  HK_TIMEZONE,
  HOME_DEPARTURE_COUNT,
  COUNTDOWN_REFRESH_INTERVAL_MS,
} from "../../lib/constants";
import type { ISODateString } from "../../domain/models/timetable";
import { toISODateString } from "../../domain/models/timetable";
import type { TimeOfDay } from "../../domain/models/departure";

export interface UseNextDepartureResult {
  departures: DepartureResult[];
  isLoading: boolean;
  error: Error | null;
}

function getHKDateTime(): { date: ISODateString; time: TimeOfDay } {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: HK_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (type: string) =>
    parts.find((p) => p.type === type)?.value ?? "0";

  return {
    date: toISODateString(`${get("year")}-${get("month")}-${get("day")}`),
    time: {
      hours: parseInt(get("hour"), 10),
      minutes: parseInt(get("minute"), 10),
    },
  };
}

/**
 * Returns the next N departures for a route/direction, refreshing every
 * COUNTDOWN_REFRESH_INTERVAL_MS. Converts wall-clock time to HK timezone
 * before calling the engine — no timezone logic leaks into the domain.
 */
export function useNextDeparture(
  routeId: RouteId,
  direction: Direction,
  count: number = HOME_DEPARTURE_COUNT
): UseNextDepartureResult {
  const [state, setState] = useState<UseNextDepartureResult>({
    departures: [],
    isLoading: true,
    error: null,
  });

  const refresh = useCallback(() => {
    try {
      const { date, time } = getHKDateTime();
      const output = getNextDepartures(
        { routeId, direction, date, currentTime: time, count },
        getTimetableRepository(),
        getHolidayRepository()
      );
      setState({ departures: output.departures, isLoading: false, error: null });
    } catch (err) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err instanceof Error ? err : new Error(String(err)),
      }));
    }
  }, [routeId, direction, count]);

  useEffect(() => {
    void getRouteRepository(); // warm the container
    refresh();
    const id = setInterval(refresh, COUNTDOWN_REFRESH_INTERVAL_MS);
    return () => clearInterval(id);
  }, [refresh]);

  return state;
}
