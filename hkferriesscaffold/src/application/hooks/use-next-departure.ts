"use client";

import { useState, useEffect } from "react";
import type { RouteId, Direction } from "../../domain/models/route";
import type { DepartureResult } from "../../domain/engine/schedule-engine";
import { getNextDepartures } from "../queries/get-next-departures";
import { getRouteRepository, getTimetableRepository, getHolidayRepository } from "../../lib/container";
import { HK_TIMEZONE, HOME_DEPARTURE_COUNT } from "../../lib/constants";

export interface UseNextDepartureResult {
  departures: DepartureResult[];
  isLoading: boolean;
  error: Error | null;
}

/**
 * Returns the next N departures for a route/direction, refreshing on a schedule.
 * Converts current wall-clock time to HK timezone before calling the engine.
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

  useEffect(() => {
    // TODO: Implement
    // - Get current HK time using Intl.DateTimeFormat with HK_TIMEZONE
    // - Call getNextDepartures with repositories from container
    // - Set up interval to refresh (see COUNTDOWN_REFRESH_INTERVAL_MS)
    // - Clean up interval on unmount
    void routeId;
    void direction;
    void count;
    void getNextDepartures;
    void getRouteRepository;
    void getTimetableRepository;
    void getHolidayRepository;
    void HK_TIMEZONE;
    setState({ departures: [], isLoading: false, error: null });
  }, [routeId, direction, count]);

  return state;
}
