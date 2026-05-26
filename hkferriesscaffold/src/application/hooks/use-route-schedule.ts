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

/** Fetches and memoises the full timetable view for a route/direction pair. */
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
    // TODO: Implement
    // - Call getRouteSchedule with repositories from container
    // - Handle not-found gracefully (null schedule, no error)
    void routeId;
    void direction;
    void getRouteSchedule;
    void getRouteRepository;
    void getTimetableRepository;
    setState({ schedule: null, isLoading: false, error: null });
  }, [routeId, direction]);

  return state;
}
