/** Wall-clock time expressed as integer hours and minutes. No Date objects, no timezone concerns. */
export interface TimeOfDay {
  readonly hours: number;
  readonly minutes: number;
}

export interface DepartureTime {
  readonly time: TimeOfDay;
  /** Whether this sailing uses a high-speed ferry instead of the standard vessel */
  readonly fastFerry?: boolean;
  /** Operator-supplied note, e.g. "Stops at Peng Chau" */
  readonly notes?: string;
  /** When true, this departure does not run on public holidays */
  readonly excludeOnPublicHoliday?: boolean;
}
