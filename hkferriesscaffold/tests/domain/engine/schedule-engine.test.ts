import { describe, it, expect } from "vitest";
import {
  getNextDeparture,
  getLastDeparture,
  getFirstDeparture,
  getUpcomingDepartures,
  calculateCountdown,
} from "../../../src/domain/engine/schedule-engine";
import { toRouteId } from "../../../src/domain/models/route";
import { toISODateString } from "../../../src/domain/models/timetable";
import type { Timetable } from "../../../src/domain/models/timetable";

// Minimal fixture timetable for testing engine functions in isolation
const fixture: Timetable = {
  routeId: toRouteId("central-cheung-chau"),
  direction: "OUTBOUND",
  dayType: "WEEKDAY",
  validFrom: toISODateString("2025-01-01"),
  validUntil: null,
  departures: [
    { time: { hours: 6, minutes: 30 } },
    { time: { hours: 7, minutes: 0 } },
    { time: { hours: 8, minutes: 0 } },
    { time: { hours: 23, minutes: 0 } },
  ],
};

describe("getNextDeparture", () => {
  it("returns the next departure after the reference time", () => {
    expect(() =>
      getNextDeparture(fixture, { hours: 7, minutes: 30 })
    ).toThrow("Not implemented");
  });

  it("returns null when past the last departure", () => {
    expect(() =>
      getNextDeparture(fixture, { hours: 23, minutes: 30 })
    ).toThrow("Not implemented");
  });

  it("returns a departure exactly at the reference time", () => {
    expect(() =>
      getNextDeparture(fixture, { hours: 7, minutes: 0 })
    ).toThrow("Not implemented");
  });
});

describe("getFirstDeparture", () => {
  it("returns the earliest departure in the timetable", () => {
    expect(() => getFirstDeparture(fixture)).toThrow("Not implemented");
  });

  it("returns null for an empty timetable", () => {
    const empty: Timetable = { ...fixture, departures: [] };
    expect(() => getFirstDeparture(empty)).toThrow("Not implemented");
  });
});

describe("getLastDeparture", () => {
  it("returns the latest departure in the timetable", () => {
    expect(() => getLastDeparture(fixture)).toThrow("Not implemented");
  });
});

describe("getUpcomingDepartures", () => {
  it("returns up to count departures", () => {
    expect(() =>
      getUpcomingDepartures(fixture, { hours: 6, minutes: 0 }, 2)
    ).toThrow("Not implemented");
  });

  it("returns empty array when no upcoming departures", () => {
    expect(() =>
      getUpcomingDepartures(fixture, { hours: 23, minutes: 30 }, 3)
    ).toThrow("Not implemented");
  });
});

describe("calculateCountdown", () => {
  it("returns positive minutes for a future departure", () => {
    expect(() =>
      calculateCountdown({ hours: 8, minutes: 0 }, { hours: 7, minutes: 30 })
    ).toThrow("Not implemented");
  });

  it("returns negative minutes for a past departure", () => {
    expect(() =>
      calculateCountdown({ hours: 7, minutes: 0 }, { hours: 7, minutes: 30 })
    ).toThrow("Not implemented");
  });
});
