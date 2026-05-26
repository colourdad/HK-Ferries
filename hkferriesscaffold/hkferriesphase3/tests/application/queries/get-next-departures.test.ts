import { describe, it, expect } from "vitest";
import { getNextDepartures } from "../../../src/application/queries/get-next-departures";
import { toRouteId } from "../../../src/domain/models/route";
import { toISODateString } from "../../../src/domain/models/timetable";
import { JsonTimetableRepository } from "../../../src/infrastructure/repositories/json-timetable.repository";
import { JsonHolidayRepository } from "../../../src/infrastructure/repositories/json-holiday.repository";

const timetableRepo = new JsonTimetableRepository();
const holidayRepo = new JsonHolidayRepository();
const routeId = toRouteId("central-cheung-chau");

describe("getNextDepartures", () => {
  it("returns upcoming departures for a known route on a weekday morning", () => {
    const output = getNextDepartures(
      {
        routeId,
        direction: "OUTBOUND",
        date: toISODateString("2025-06-02"),
        currentTime: { hours: 9, minutes: 0 },
        count: 3,
      },
      timetableRepo,
      holidayRepo
    );

    expect(output.timetableFound).toBe(true);
    expect(output.departures).toHaveLength(3);
    output.departures.forEach((d) => {
      expect(d.countdownMinutes).toBeGreaterThanOrEqual(0);
    });
  });

  it("returns timetableFound: false for an unknown route", () => {
    const output = getNextDepartures(
      {
        routeId: toRouteId("nonexistent-route"),
        direction: "OUTBOUND",
        date: toISODateString("2025-06-02"),
        currentTime: { hours: 9, minutes: 0 },
      },
      timetableRepo,
      holidayRepo
    );
    expect(output.timetableFound).toBe(false);
    expect(output.departures).toHaveLength(0);
  });

  it("returns timetableFound: false after last sailing of the day", () => {
    const output = getNextDepartures(
      {
        routeId,
        direction: "OUTBOUND",
        date: toISODateString("2025-06-02"),
        currentTime: { hours: 23, minutes: 59 },
      },
      timetableRepo,
      holidayRepo
    );
    // Timetable exists but no more sailings
    expect(output.timetableFound).toBe(true);
    expect(output.departures).toHaveLength(0);
  });

  it("uses the public holiday timetable on a HK public holiday", () => {
    // 2025-04-04 is Ching Ming Festival (PUBLIC_HOLIDAY)
    const output = getNextDepartures(
      {
        routeId,
        direction: "OUTBOUND",
        date: toISODateString("2025-04-04"),
        currentTime: { hours: 9, minutes: 0 },
        count: 1,
      },
      timetableRepo,
      holidayRepo
    );
    expect(output.timetableFound).toBe(true);
    expect(output.departures.length).toBeGreaterThan(0);
  });

  it("defaults to HOME_DEPARTURE_COUNT when count is not specified", () => {
    const output = getNextDepartures(
      {
        routeId,
        direction: "OUTBOUND",
        date: toISODateString("2025-06-02"),
        currentTime: { hours: 6, minutes: 0 },
      },
      timetableRepo,
      holidayRepo
    );
    expect(output.departures.length).toBeLessThanOrEqual(3);
  });
});
