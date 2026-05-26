import { describe, it, expect } from "vitest";
import { JsonTimetableRepository } from "../../../src/infrastructure/repositories/json-timetable.repository";
import { toRouteId } from "../../../src/domain/models/route";
import { toISODateString } from "../../../src/domain/models/timetable";

const routeId = toRouteId("central-cheung-chau");

describe("JsonTimetableRepository", () => {
  const repo = new JsonTimetableRepository();

  describe("getByRoute — Central ↔ Cheung Chau", () => {
    it("returns a weekday outbound timetable", () => {
      const t = repo.getByRoute(routeId, "OUTBOUND", "WEEKDAY");
      expect(t).not.toBeNull();
      expect(t!.routeId).toBe(routeId);
      expect(t!.direction).toBe("OUTBOUND");
      expect(t!.dayType).toBe("WEEKDAY");
    });

    it("returns a Saturday outbound timetable", () => {
      expect(repo.getByRoute(routeId, "OUTBOUND", "SATURDAY")).not.toBeNull();
    });

    it("returns a Sunday outbound timetable", () => {
      expect(repo.getByRoute(routeId, "OUTBOUND", "SUNDAY")).not.toBeNull();
    });

    it("returns a public holiday outbound timetable", () => {
      expect(repo.getByRoute(routeId, "OUTBOUND", "PUBLIC_HOLIDAY")).not.toBeNull();
    });

    it("returns a weekday inbound timetable", () => {
      const t = repo.getByRoute(routeId, "INBOUND", "WEEKDAY");
      expect(t).not.toBeNull();
      expect(t!.direction).toBe("INBOUND");
    });

    it("returns a Saturday inbound timetable", () => {
      expect(repo.getByRoute(routeId, "INBOUND", "SATURDAY")).not.toBeNull();
    });

    it("returns a Sunday inbound timetable", () => {
      expect(repo.getByRoute(routeId, "INBOUND", "SUNDAY")).not.toBeNull();
    });

    it("returns a public holiday inbound timetable", () => {
      expect(repo.getByRoute(routeId, "INBOUND", "PUBLIC_HOLIDAY")).not.toBeNull();
    });

    it("returns null for an unknown route", () => {
      expect(
        repo.getByRoute(toRouteId("unknown-route"), "OUTBOUND", "WEEKDAY")
      ).toBeNull();
    });

    it("weekday outbound timetable has departures sorted in ascending time order", () => {
      const t = repo.getByRoute(routeId, "OUTBOUND", "WEEKDAY")!;
      const times = t.departures.map(
        (d) => d.time.hours * 60 + d.time.minutes
      );
      for (let i = 1; i < times.length; i++) {
        expect(times[i]).toBeGreaterThan(times[i - 1]!);
      }
    });

    it("weekday outbound timetable starts at or after 06:00", () => {
      const t = repo.getByRoute(routeId, "OUTBOUND", "WEEKDAY")!;
      const first = t.departures[0]!;
      expect(first.time.hours).toBeGreaterThanOrEqual(6);
    });

    it("weekday outbound timetable has at least 10 departures", () => {
      const t = repo.getByRoute(routeId, "OUTBOUND", "WEEKDAY")!;
      expect(t.departures.length).toBeGreaterThanOrEqual(10);
    });

    it("some weekday outbound departures are marked as fast ferry", () => {
      const t = repo.getByRoute(routeId, "OUTBOUND", "WEEKDAY")!;
      expect(t.departures.some((d) => d.fastFerry === true)).toBe(true);
    });
  });

  describe("getOverrides", () => {
    it("returns empty array when no overrides exist", () => {
      const result = repo.getOverrides(routeId, {
        from: toISODateString("2025-06-01"),
        to: toISODateString("2025-06-30"),
      });
      expect(result).toEqual([]);
    });
  });
});
