/**
 * Integration tests: real repository data → schedule engine → correct results.
 * No mocks — exercises the full domain stack end to end.
 */
import { describe, it, expect } from "vitest";
import { JsonTimetableRepository } from "../../src/infrastructure/repositories/json-timetable.repository";
import { JsonHolidayRepository } from "../../src/infrastructure/repositories/json-holiday.repository";
import { resolveApplicableTimetable, resolveScheduleDayType } from "../../src/domain/engine/schedule-resolver";
import { getNextDeparture, getUpcomingDepartures, getFirstDeparture, getLastDeparture } from "../../src/domain/engine/schedule-engine";
import { toRouteId } from "../../src/domain/models/route";
import { toISODateString } from "../../src/domain/models/timetable";

const timetableRepo = new JsonTimetableRepository();
const holidayRepo = new JsonHolidayRepository();
const routeId = toRouteId("central-cheung-chau");

describe("Schedule lookup — Central ↔ Cheung Chau", () => {
  describe("day type resolution with real holiday data", () => {
    it("resolves 2025-01-01 (New Year's Day) as PUBLIC_HOLIDAY", () => {
      const holidays = holidayRepo.getByYear(2025);
      expect(resolveScheduleDayType(toISODateString("2025-01-01"), holidays)).toBe("PUBLIC_HOLIDAY");
    });

    it("resolves 2025-06-02 (Monday) as WEEKDAY", () => {
      const holidays = holidayRepo.getByYear(2025);
      expect(resolveScheduleDayType(toISODateString("2025-06-02"), holidays)).toBe("WEEKDAY");
    });

    it("resolves 2025-06-07 (Saturday) as SATURDAY", () => {
      const holidays = holidayRepo.getByYear(2025);
      expect(resolveScheduleDayType(toISODateString("2025-06-07"), holidays)).toBe("SATURDAY");
    });

    it("resolves 2025-06-08 (Sunday) as SUNDAY", () => {
      const holidays = holidayRepo.getByYear(2025);
      expect(resolveScheduleDayType(toISODateString("2025-06-08"), holidays)).toBe("SUNDAY");
    });
  });

  describe("timetable resolution", () => {
    it("resolves a weekday outbound timetable for a Monday", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "OUTBOUND", toISODateString("2025-06-02"), holidays, [], timetableRepo
      );
      expect(timetable).not.toBeNull();
      expect(timetable!.dayType).toBe("WEEKDAY");
    });

    it("resolves a PUBLIC_HOLIDAY timetable for Ching Ming Festival", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "OUTBOUND", toISODateString("2025-04-04"), holidays, [], timetableRepo
      );
      expect(timetable).not.toBeNull();
      expect(timetable!.dayType).toBe("PUBLIC_HOLIDAY");
    });
  });

  describe("next departure lookup", () => {
    it("finds a next departure on a weekday morning", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "OUTBOUND", toISODateString("2025-06-02"), holidays, [], timetableRepo
      )!;
      const result = getNextDeparture(timetable, { hours: 8, minutes: 0 });
      expect(result).not.toBeNull();
      const depMins = result!.departure.time.hours * 60 + result!.departure.time.minutes;
      expect(depMins).toBeGreaterThanOrEqual(8 * 60);
    });

    it("returns null after the last sailing of the day", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "OUTBOUND", toISODateString("2025-06-02"), holidays, [], timetableRepo
      )!;
      const last = getLastDeparture(timetable)!;
      // One minute after last departure — nothing left
      const afterLast = { hours: last.time.hours, minutes: last.time.minutes + 1 };
      expect(getNextDeparture(timetable, afterLast)).toBeNull();
    });

    it("returns up to 3 upcoming departures from 09:00 on a weekday", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "OUTBOUND", toISODateString("2025-06-02"), holidays, [], timetableRepo
      )!;
      const results = getUpcomingDepartures(timetable, { hours: 9, minutes: 0 }, 3);
      expect(results.length).toBe(3);
      results.forEach((r) => {
        expect(r.countdownMinutes).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe("first and last departure", () => {
    it("weekday outbound first departure is before 07:00", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "OUTBOUND", toISODateString("2025-06-02"), holidays, [], timetableRepo
      )!;
      const first = getFirstDeparture(timetable)!;
      expect(first.time.hours).toBeLessThan(7);
    });

    it("weekday outbound last departure is after 22:00", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "OUTBOUND", toISODateString("2025-06-02"), holidays, [], timetableRepo
      )!;
      const last = getLastDeparture(timetable)!;
      expect(last.time.hours).toBeGreaterThanOrEqual(22);
    });
  });

  describe("inbound service", () => {
    it("resolves a weekday inbound timetable", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "INBOUND", toISODateString("2025-06-02"), holidays, [], timetableRepo
      );
      expect(timetable).not.toBeNull();
      expect(timetable!.direction).toBe("INBOUND");
    });

    it("inbound first departure is before 07:00", () => {
      const holidays = holidayRepo.getByYear(2025);
      const timetable = resolveApplicableTimetable(
        routeId, "INBOUND", toISODateString("2025-06-02"), holidays, [], timetableRepo
      )!;
      const first = getFirstDeparture(timetable)!;
      expect(first.time.hours).toBeLessThan(7);
    });
  });
});
