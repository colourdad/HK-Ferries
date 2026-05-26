import { describe, it, expect } from "vitest";
import {
  resolveScheduleDayType,
  resolveApplicableTimetable,
} from "../../../src/domain/engine/schedule-resolver";
import { toISODateString } from "../../../src/domain/models/timetable";
import { toRouteId } from "../../../src/domain/models/route";
import type { PublicHoliday, Timetable } from "../../../src/domain/models/timetable";
import type { SpecialOverride } from "../../../src/domain/models/special-override";
import type { TimetableRepository } from "../../../src/domain/ports/timetable-repository.port";

// --- Fixtures ---

const noHolidays: PublicHoliday[] = [];

const holidays: PublicHoliday[] = [
  {
    date: toISODateString("2025-04-04"),
    name: "Ching Ming Festival",
    nameZh: "清明節",
  },
  {
    // 2025-06-08 is a Sunday — used to test PUBLIC_HOLIDAY beats SUNDAY
    date: toISODateString("2025-06-08"),
    name: "Dragon Boat Festival",
    nameZh: "端午節",
  },
];

const noOverrides: SpecialOverride[] = [];

const routeId = toRouteId("central-cheung-chau");

const weekdayTimetable: Timetable = {
  routeId,
  direction: "OUTBOUND",
  dayType: "WEEKDAY",
  validFrom: toISODateString("2025-01-01"),
  validUntil: null,
  departures: [{ time: { hours: 6, minutes: 30 } }],
};

const mockRepo: TimetableRepository = {
  getByRoute: (id, direction, dayType) => {
    if (id === routeId && direction === "OUTBOUND" && dayType === "WEEKDAY") {
      return weekdayTimetable;
    }
    return null;
  },
  getOverrides: () => [],
};

// --- resolveScheduleDayType ---

describe("resolveScheduleDayType", () => {
  it("returns WEEKDAY for a Monday", () => {
    // 2025-06-02 is a Monday
    expect(resolveScheduleDayType(toISODateString("2025-06-02"), noHolidays)).toBe("WEEKDAY");
  });

  it("returns WEEKDAY for a Friday", () => {
    // 2025-06-06 is a Friday
    expect(resolveScheduleDayType(toISODateString("2025-06-06"), noHolidays)).toBe("WEEKDAY");
  });

  it("returns SATURDAY for a Saturday", () => {
    // 2025-06-07 is a Saturday
    expect(resolveScheduleDayType(toISODateString("2025-06-07"), noHolidays)).toBe("SATURDAY");
  });

  it("returns SUNDAY for a Sunday", () => {
    // 2025-06-08 is a Sunday
    expect(resolveScheduleDayType(toISODateString("2025-06-08"), noHolidays)).toBe("SUNDAY");
  });

  it("returns PUBLIC_HOLIDAY for a date in the holidays list", () => {
    expect(resolveScheduleDayType(toISODateString("2025-04-04"), holidays)).toBe("PUBLIC_HOLIDAY");
  });

  it("PUBLIC_HOLIDAY takes precedence over SUNDAY", () => {
    // 2025-06-08 is a Sunday but also in our holidays fixture
    expect(resolveScheduleDayType(toISODateString("2025-06-08"), holidays)).toBe("PUBLIC_HOLIDAY");
  });

  it("PUBLIC_HOLIDAY takes precedence over SATURDAY", () => {
    const saturdayHoliday: PublicHoliday[] = [
      { date: toISODateString("2025-06-07"), name: "Test", nameZh: "測試" },
    ];
    // 2025-06-07 is a Saturday
    expect(resolveScheduleDayType(toISODateString("2025-06-07"), saturdayHoliday)).toBe("PUBLIC_HOLIDAY");
  });
});

// --- resolveApplicableTimetable ---

describe("resolveApplicableTimetable", () => {
  it("returns the standard weekday timetable for a Monday", () => {
    const result = resolveApplicableTimetable(
      routeId,
      "OUTBOUND",
      toISODateString("2025-06-02"),
      noHolidays,
      noOverrides,
      mockRepo
    );
    expect(result).toBe(weekdayTimetable);
  });

  it("returns null when no timetable exists for the day type", () => {
    // mockRepo only has WEEKDAY — Saturday returns null
    const result = resolveApplicableTimetable(
      routeId,
      "OUTBOUND",
      toISODateString("2025-06-07"),
      noHolidays,
      noOverrides,
      mockRepo
    );
    expect(result).toBeNull();
  });

  it("returns the override timetable when the date falls within its range", () => {
    const overrideTimetable: Timetable = {
      routeId,
      direction: "OUTBOUND",
      dayType: "WEEKDAY",
      validFrom: toISODateString("2025-06-02"),
      validUntil: toISODateString("2025-06-04"),
      departures: [{ time: { hours: 9, minutes: 0 } }],
    };

    const overrides: SpecialOverride[] = [
      {
        id: "typhoon-2025",
        routeId,
        dateRange: {
          from: toISODateString("2025-06-02"),
          to: toISODateString("2025-06-04"),
        },
        description: "Typhoon arrangement",
        replacementTimetable: overrideTimetable,
      },
    ];

    const result = resolveApplicableTimetable(
      routeId,
      "OUTBOUND",
      toISODateString("2025-06-03"),
      noHolidays,
      overrides,
      mockRepo
    );
    expect(result).toBe(overrideTimetable);
  });

  it("falls back to the standard timetable when date is outside the override range", () => {
    const overrides: SpecialOverride[] = [
      {
        id: "typhoon-2025",
        routeId,
        dateRange: {
          from: toISODateString("2025-06-02"),
          to: toISODateString("2025-06-04"),
        },
        description: "Typhoon arrangement",
        replacementTimetable: {
          routeId,
          direction: "OUTBOUND",
          dayType: "WEEKDAY",
          validFrom: toISODateString("2025-06-02"),
          validUntil: toISODateString("2025-06-04"),
          departures: [],
        },
      },
    ];

    const result = resolveApplicableTimetable(
      routeId,
      "OUTBOUND",
      toISODateString("2025-06-05"),
      noHolidays,
      overrides,
      mockRepo
    );
    expect(result).toBe(weekdayTimetable);
  });
});
