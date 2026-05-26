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
    // TODO: Implement after time-utils is built
    expect(() => toMinutesSinceMidnight({ hours: 0, minutes: 0 })).toThrow(
      "Not implemented"
    );
  });

  it("converts 06:30 to 390", () => {
    expect(() => toMinutesSinceMidnight({ hours: 6, minutes: 30 })).toThrow(
      "Not implemented"
    );
  });

  it("converts 23:59 to 1439", () => {
    expect(() => toMinutesSinceMidnight({ hours: 23, minutes: 59 })).toThrow(
      "Not implemented"
    );
  });
});

describe("fromMinutesSinceMidnight", () => {
  it("converts 0 to midnight", () => {
    expect(() => fromMinutesSinceMidnight(0)).toThrow("Not implemented");
  });

  it("converts 390 to 06:30", () => {
    expect(() => fromMinutesSinceMidnight(390)).toThrow("Not implemented");
  });
});

describe("minutesBetween", () => {
  it("returns positive minutes when to is after from", () => {
    expect(() =>
      minutesBetween({ hours: 6, minutes: 0 }, { hours: 7, minutes: 0 })
    ).toThrow("Not implemented");
  });

  it("handles midnight crossing when to is earlier than from", () => {
    expect(() =>
      minutesBetween({ hours: 23, minutes: 30 }, { hours: 0, minutes: 30 })
    ).toThrow("Not implemented");
  });
});

describe("formatTime", () => {
  it("formats single-digit hours and minutes with leading zeros", () => {
    expect(() => formatTime({ hours: 6, minutes: 5 })).toThrow(
      "Not implemented"
    );
  });

  it("formats 23:59 correctly", () => {
    expect(() => formatTime({ hours: 23, minutes: 59 })).toThrow(
      "Not implemented"
    );
  });
});

describe("parseTime", () => {
  it("parses a valid HH:MM string", () => {
    expect(() => parseTime("06:30")).toThrow("Not implemented");
  });

  it("throws on invalid input", () => {
    expect(() => parseTime("invalid")).toThrow();
  });
});
