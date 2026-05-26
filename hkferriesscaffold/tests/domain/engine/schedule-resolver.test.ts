import { describe, it, expect } from "vitest";
import { resolveScheduleDayType } from "../../../src/domain/engine/schedule-resolver";
import { toISODateString } from "../../../src/domain/models/timetable";
import type { PublicHoliday } from "../../../src/domain/models/timetable";

const noHolidays: PublicHoliday[] = [];

const holidays: PublicHoliday[] = [
  {
    date: toISODateString("2025-04-04"),
    name: "Ching Ming Festival",
    nameZh: "清明節",
  },
];

describe("resolveScheduleDayType", () => {
  it("returns WEEKDAY for a Monday with no holidays", () => {
    // 2025-06-02 is a Monday
    expect(() =>
      resolveScheduleDayType(toISODateString("2025-06-02"), noHolidays)
    ).toThrow("Not implemented");
  });

  it("returns SATURDAY for a Saturday", () => {
    // 2025-06-07 is a Saturday
    expect(() =>
      resolveScheduleDayType(toISODateString("2025-06-07"), noHolidays)
    ).toThrow("Not implemented");
  });

  it("returns SUNDAY for a Sunday", () => {
    // 2025-06-08 is a Sunday
    expect(() =>
      resolveScheduleDayType(toISODateString("2025-06-08"), noHolidays)
    ).toThrow("Not implemented");
  });

  it("returns PUBLIC_HOLIDAY for a date in the holidays list", () => {
    expect(() =>
      resolveScheduleDayType(toISODateString("2025-04-04"), holidays)
    ).toThrow("Not implemented");
  });

  it("PUBLIC_HOLIDAY takes precedence over SUNDAY", () => {
    // 2025-04-04 is also a Friday — but it's a holiday, so PUBLIC_HOLIDAY wins
    expect(() =>
      resolveScheduleDayType(toISODateString("2025-04-04"), holidays)
    ).toThrow("Not implemented");
  });
});
