"use client";

import { useState, useEffect } from "react";
import type { RouteId, Direction } from "../../domain/models/route";
import type { RouteScheduleView } from "../queries/get-route-schedule";
import { getRouteSchedule } from "../queries/get-route-schedule";
import { getRouteRepository, getTimetableRepository } from "../../lib/container";

export interface UseRouteScheduleResult {
  schedule: RouteScheduleView | null;
  isLoading: boolean;
  error: Error | null;
}

/** Fetches the full timetable view for a route/direction pair. */
export function useRouteSchedule(
  routeId: RouteId,
  direction: Direction
): UseRouteScheduleResult {
  const [state, setState] = useState<UseRouteScheduleResult>({
    schedule: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    try {
      const schedule = getRouteSchedule(
        routeId,
        direction,
        getRouteRepository(),
        getTimetableRepository()
      );
      setState({ schedule, isLoading: false, error: null });
    } catch (err) {
      setState({
        schedule: null,
        isLoading: false,
        error: err instanceof Error ? err : new Error(String(err)),
      });
    }
  }, [routeId, direction]);

  return state;
}
