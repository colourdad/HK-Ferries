import { describe, it, expect } from "vitest";
import {
  toMinutesSinceMidnight,
  fromMinutesSinceMidnight,
  minutesBetween,
  formatTime,
  parseTime,
} from "../../../src/domain/engine/time-utils";

describe("toMinutesSinceMidnight", () => {
  it("converts midnight to 0", () => {
    expect(toMinutesSinceMidnight({ hours: 0, minutes: 0 })).toBe(0);
  });

  it("converts 06:30 to 390", () => {
    expect(toMinutesSinceMidnight({ hours: 6, minutes: 30 })).toBe(390);
  });

  it("converts 23:59 to 1439", () => {
    expect(toMinutesSinceMidnight({ hours: 23, minutes: 59 })).toBe(1439);
  });
});

describe("fromMinutesSinceMidnight", () => {
  it("converts 0 to midnight", () => {
    expect(fromMinutesSinceMidnight(0)).toEqual({ hours: 0, minutes: 0 });
  });

  it("converts 390 to 06:30", () => {
    expect(fromMinutesSinceMidnight(390)).toEqual({ hours: 6, minutes: 30 });
  });

  it("round-trips with toMinutesSinceMidnight", () => {
    const time = { hours: 14, minutes: 47 };
    expect(fromMinutesSinceMidnight(toMinutesSinceMidnight(time))).toEqual(time);
  });
});

describe("minutesBetween", () => {
  it("returns 60 for a 1-hour gap", () => {
    expect(minutesBetween({ hours: 6, minutes: 0 }, { hours: 7, minutes: 0 })).toBe(60);
  });

  it("returns 0 when from and to are the same", () => {
    expect(minutesBetween({ hours: 9, minutes: 0 }, { hours: 9, minutes: 0 })).toBe(0);
  });

  it("handles midnight crossing: 23:30 → 00:30 = 60 minutes", () => {
    expect(minutesBetween({ hours: 23, minutes: 30 }, { hours: 0, minutes: 30 })).toBe(60);
  });

  it("handles midnight crossing: 23:00 → 00:00 = 60 minutes", () => {
    expect(minutesBetween({ hours: 23, minutes: 0 }, { hours: 0, minutes: 0 })).toBe(60);
  });
});

describe("formatTime", () => {
  it("formats single-digit hours and minutes with leading zeros", () => {
    expect(formatTime({ hours: 6, minutes: 5 })).toBe("06:05");
  });

  it("formats midnight as 00:00", () => {
    expect(formatTime({ hours: 0, minutes: 0 })).toBe("00:00");
  });

  it("formats 23:59 correctly", () => {
    expect(formatTime({ hours: 23, minutes: 59 })).toBe("23:59");
  });
});

describe("parseTime", () => {
  it("parses a valid HH:MM string", () => {
    expect(parseTime("06:30")).toEqual({ hours: 6, minutes: 30 });
  });

  it("parses midnight", () => {
    expect(parseTime("00:00")).toEqual({ hours: 0, minutes: 0 });
  });

  it("parses 23:59", () => {
    expect(parseTime("23:59")).toEqual({ hours: 23, minutes: 59 });
  });

  it("throws on non-numeric input", () => {
    expect(() => parseTime("invalid")).toThrow();
  });

  it("throws on out-of-range hours", () => {
    expect(() => parseTime("25:00")).toThrow();
  });

  it("throws on out-of-range minutes", () => {
    expect(() => parseTime("12:60")).toThrow();
  });
});
