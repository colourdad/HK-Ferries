import type { PublicHoliday } from "../../../domain/models/timetable";
import { toISODateString } from "../../../domain/models/timetable";

// TODO: Populate with official HK public holidays sourced from
// https://www.gov.hk/en/about/abouthk/holiday/
// Cover at minimum: current year + next year
export const HK_PUBLIC_HOLIDAYS_2025: readonly PublicHoliday[] = [
  {
    date: toISODateString("2025-01-01"),
    name: "New Year's Day",
    nameZh: "元旦",
  },
  {
    date: toISODateString("2025-01-29"),
    name: "Lunar New Year's Day",
    nameZh: "農曆年初一",
  },
  // TODO: Add remaining 2025 holidays
];

export const HK_PUBLIC_HOLIDAYS_2026: readonly PublicHoliday[] = [
  // TODO: Populate 2026 holidays
];
