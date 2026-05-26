import { describe, it, expect } from "vitest";
import {
  getNextDeparture,
  getPreviousDeparture,
  getLastDeparture,
  getFirstDeparture,
  getUpcomingDepartures,
  calculateCountdown,
} from "../../../src/domain/engine/schedule-engine";
import { toRouteId } from "../../../src/domain/models/route";
import { toISODateString } from "../../../src/domain/models/timetable";
import type { Timetable } from "../../../src/domain/models/timetable";

// Fixture timetable — departures must be in ascending time order
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

const emptyTimetable: Timetable = { ...fixture, departures: [] };

// --- getNextDeparture ---

describe("getNextDeparture", () => {
  it("returns the next departure after the reference time", () => {
    const result = getNextDeparture(fixture, { hours: 7, minutes: 30 });
    expect(result).not.toBeNull();
    expect(result!.departure.time).toEqual({ hours: 8, minutes: 0 });
    expect(result!.countdownMinutes).toBe(30);
  });

  it("returns a departure exactly at the reference time (inclusive)", () => {
    const result = getNextDeparture(fixture, { hours: 7, minutes: 0 });
    expect(result).not.toBeNull();
    expect(result!.departure.time).toEqual({ hours: 7, minutes: 0 });
    expect(result!.countdownMinutes).toBe(0);
  });

  it("returns the first departure when reference time is before all departures", () => {
    const result = getNextDeparture(fixture, { hours: 5, minutes: 0 });
    expect(result!.departure.time).toEqual({ hours: 6, minutes: 30 });
    expect(result!.countdownMinutes).toBe(90);
  });

  it("returns null when past the last departure", () => {
    expect(getNextDeparture(fixture, { hours: 23, minutes: 30 })).toBeNull();
  });

  it("returns null for an empty timetable", () => {
    expect(getNextDeparture(emptyTimetable, { hours: 9, minutes: 0 })).toBeNull();
  });
});

// --- getPreviousDeparture ---

describe("getPreviousDeparture", () => {
  it("returns the most recent departure before the reference time", () => {
    const result = getPreviousDeparture(fixture, { hours: 8, minutes: 30 });
    expect(result).not.toBeNull();
    expect(result!.departure.time).toEqual({ hours: 8, minutes: 0 });
    expect(result!.countdownMinutes).toBe(-30);
  });

  it("is strictly before — does not return a departure at exactly the reference time", () => {
    const result = getPreviousDeparture(fixture, { hours: 7, minutes: 0 });
    expect(result!.departure.time).toEqual({ hours: 6, minutes: 30 });
  });

  it("returns null when reference time is before all departures", () => {
    expect(getPreviousDeparture(fixture, { hours: 5, minutes: 0 })).toBeNull();
  });

  it("returns null for an empty timetable", () => {
    expect(getPreviousDeparture(emptyTimetable, { hours: 9, minutes: 0 })).toBeNull();
  });
});

// --- getFirstDeparture ---

describe("getFirstDeparture", () => {
  it("returns the earliest departure in the timetable", () => {
    expect(getFirstDeparture(fixture)).toEqual({ time: { hours: 6, minutes: 30 } });
  });

  it("returns null for an empty timetable", () => {
    expect(getFirstDeparture(emptyTimetable)).toBeNull();
  });
});

// --- getLastDeparture ---

describe("getLastDeparture", () => {
  it("returns the latest departure in the timetable", () => {
    expect(getLastDeparture(fixture)).toEqual({ time: { hours: 23, minutes: 0 } });
  });

  it("returns null for an empty timetable", () => {
    expect(getLastDeparture(emptyTimetable)).toBeNull();
  });
});

// --- getUpcomingDepartures ---

describe("getUpcomingDepartures", () => {
  it("returns up to count departures from reference time", () => {
    const results = getUpcomingDepartures(fixture, { hours: 6, minutes: 0 }, 2);
    expect(results).toHaveLength(2);
    expect(results[0]!.departure.time).toEqual({ hours: 6, minutes: 30 });
    expect(results[1]!.departure.time).toEqual({ hours: 7, minutes: 0 });
  });

  it("includes a departure exactly at reference time", () => {
    const results = getUpcomingDepartures(fixture, { hours: 7, minutes: 0 }, 3);
    expect(results[0]!.departure.time).toEqual({ hours: 7, minutes: 0 });
    expect(results[0]!.countdownMinutes).toBe(0);
  });

  it("returns all remaining when count exceeds available departures", () => {
    const results = getUpcomingDepartures(fixture, { hours: 22, minutes: 0 }, 10);
    expect(results).toHaveLength(1);
    expect(results[0]!.departure.time).toEqual({ hours: 23, minutes: 0 });
  });

  it("returns empty array when no upcoming departures exist", () => {
    expect(getUpcomingDepartures(fixture, { hours: 23, minutes: 30 }, 3)).toEqual([]);
  });

  it("returns empty array for an empty timetable", () => {
    expect(getUpcomingDepartures(emptyTimetable, { hours: 9, minutes: 0 }, 3)).toEqual([]);
  });
});

// --- calculateCountdown ---

describe("calculateCountdown", () => {
  it("returns positive minutes for a future departure", () => {
    expect(calculateCountdown({ hours: 8, minutes: 0 }, { hours: 7, minutes: 30 })).toBe(30);
  });

  it("returns zero when departure time equals reference time", () => {
    expect(calculateCountdown({ hours: 9, minutes: 0 }, { hours: 9, minutes: 0 })).toBe(0);
  });

  it("returns negative minutes for a past departure", () => {
    expect(calculateCountdown({ hours: 7, minutes: 0 }, { hours: 7, minutes: 30 })).toBe(-30);
  });
});
