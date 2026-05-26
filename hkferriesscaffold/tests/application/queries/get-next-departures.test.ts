import { describe, it, expect } from "vitest";
import { getNextDepartures } from "../../../src/application/queries/get-next-departures";
import { toRouteId } from "../../../src/domain/models/route";
import { toISODateString } from "../../../src/domain/models/timetable";

// TODO: Replace with proper mock repositories in Phase 3 once queries are implemented

describe("getNextDepartures", () => {
  it("throws Not implemented until Phase 3", () => {
    expect(() =>
      getNextDepartures(
        {
          routeId: toRouteId("central-cheung-chau"),
          direction: "OUTBOUND",
          date: toISODateString("2025-06-02"),
          currentTime: { hours: 9, minutes: 0 },
        },
        // @ts-expect-error — mock repositories not wired yet
        null,
        null
      )
    ).toThrow("Not implemented");
  });
});
