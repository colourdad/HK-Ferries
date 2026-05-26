import type { PublicHoliday } from "../models/timetable";

export interface HolidayRepository {
  /** Returns all public holidays for the given calendar year */
  getByYear(year: number): PublicHoliday[];
}
