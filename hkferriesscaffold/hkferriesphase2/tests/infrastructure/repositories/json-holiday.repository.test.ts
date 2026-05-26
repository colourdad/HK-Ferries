import { describe, it, expect } from "vitest";
import { JsonHolidayRepository } from "../../../src/infrastructure/repositories/json-holiday.repository";

describe("JsonHolidayRepository", () => {
  const repo = new JsonHolidayRepository();

  describe("getByYear", () => {
    it("returns 17 holidays for 2025", () => {
      expect(repo.getByYear(2025)).toHaveLength(17);
    });

    it("returns 17 holidays for 2026", () => {
      expect(repo.getByYear(2026)).toHaveLength(17);
    });

    it("returns an empty array for an unsupported year", () => {
      expect(repo.getByYear(2099)).toEqual([]);
    });

    it("2025 includes New Year's Day on 2025-01-01", () => {
      const holidays = repo.getByYear(2025);
      expect(holidays.some((h) => h.date === "2025-01-01")).toBe(true);
    });

    it("2025 includes Lunar New Year on 2025-01-29", () => {
      const holidays = repo.getByYear(2025);
      expect(holidays.some((h) => h.date === "2025-01-29")).toBe(true);
    });

    it("2025 includes Ching Ming Festival on 2025-04-04", () => {
      const holidays = repo.getByYear(2025);
      expect(holidays.some((h) => h.date === "2025-04-04")).toBe(true);
    });

    it("2025 includes Christmas Day on 2025-12-25", () => {
      const holidays = repo.getByYear(2025);
      expect(holidays.some((h) => h.date === "2025-12-25")).toBe(true);
    });

    it("2026 includes Lunar New Year on 2026-02-17", () => {
      const holidays = repo.getByYear(2026);
      expect(holidays.some((h) => h.date === "2026-02-17")).toBe(true);
    });

    it("returns a new array each call (no shared mutation risk)", () => {
      const a = repo.getByYear(2025);
      const b = repo.getByYear(2025);
      expect(a).not.toBe(b);
    });
  });
});
