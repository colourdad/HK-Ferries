import type { RouteId, Direction } from "./route";
import type { DepartureTime } from "./departure";
import type { ScheduleDayType } from "./schedule-day-type";

/** ISO 8601 date string — YYYY-MM-DD. Branded to prevent plain strings. */
export type ISODateString = string & { readonly __brand: "ISODateString" };

export function toISODateString(value: string): ISODateString {
  // TODO: Add validation that value matches YYYY-MM-DD format
  return value as ISODateString;
}

export interface Timetable {
  readonly routeId: RouteId;
  readonly direction: Direction;
  readonly dayType: ScheduleDayType;
  readonly departures: readonly DepartureTime[];
  /** Inclusive start date for this timetable version */
  readonly validFrom: ISODateString;
  /** Inclusive end date, or null if this timetable is open-ended */
  readonly validUntil: ISODateString | null;
}

export interface PublicHoliday {
  readonly date: ISODateString;
  readonly name: string;
  readonly nameZh: string;
}
