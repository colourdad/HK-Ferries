import type { HolidayRepository } from "../../domain/ports/holiday-repository.port";
import type { PublicHoliday } from "../../domain/models/timetable";
import {
  HK_PUBLIC_HOLIDAYS_2025,
  HK_PUBLIC_HOLIDAYS_2026,
} from "../data/holidays/hk-public-holidays";

const HOLIDAYS_BY_YEAR: Record<number, readonly PublicHoliday[]> = {
  2025: HK_PUBLIC_HOLIDAYS_2025,
  2026: HK_PUBLIC_HOLIDAYS_2026,
  // TODO: Add years as they are populated
};

export class JsonHolidayRepository implements HolidayRepository {
  getByYear(year: number): PublicHoliday[] {
    return [...(HOLIDAYS_BY_YEAR[year] ?? [])];
  }
}
