// VERIFICATION REQUIRED before production launch.
// Source: https://www.sunferry.com.hk/en/route-and-fare/timetable?route=central-to-cheung-chau
// Operator: Sun Ferry Services Co. Ltd (formerly New World First Ferry)
// Route: Central Pier 5 ↔ Cheung Chau Ferry Pier
// Journey time: Ordinary ~55 min | Fast ~35 min
// Last data check: TODO — verify all times against official PDF before launch

import type { Timetable } from "../../../domain/models/timetable";
import { toRouteId } from "../../../domain/models/route";
import { toISODateString } from "../../../domain/models/timetable";

const routeId = toRouteId("central-cheung-chau");
const validFrom = toISODateString("2025-01-01");

// ---------------------------------------------------------------------------
// OUTBOUND — Central → Cheung Chau
// ---------------------------------------------------------------------------

export const CENTRAL_TO_CHEUNG_CHAU_WEEKDAY: Timetable = {
  routeId,
  direction: "OUTBOUND",
  dayType: "WEEKDAY",
  validFrom,
  validUntil: null,
  departures: [
    { time: { hours: 6,  minutes: 30 } },
    { time: { hours: 7,  minutes: 15 }, fastFerry: true },
    { time: { hours: 8,  minutes: 0  } },
    { time: { hours: 8,  minutes: 30 }, fastFerry: true },
    { time: { hours: 9,  minutes: 0  } },
    { time: { hours: 9,  minutes: 30 }, fastFerry: true },
    { time: { hours: 10, minutes: 0  } },
    { time: { hours: 10, minutes: 30 }, fastFerry: true },
    { time: { hours: 11, minutes: 0  } },
    { time: { hours: 11, minutes: 30 }, fastFerry: true },
    { time: { hours: 12, minutes: 0  } },
    { time: { hours: 12, minutes: 30 }, fastFerry: true },
    { time: { hours: 13, minutes: 0  } },
    { time: { hours: 13, minutes: 30 }, fastFerry: true },
    { time: { hours: 14, minutes: 0  } },
    { time: { hours: 14, minutes: 30 }, fastFerry: true },
    { time: { hours: 15, minutes: 0  } },
    { time: { hours: 15, minutes: 30 }, fastFerry: true },
    { time: { hours: 16, minutes: 0  } },
    { time: { hours: 16, minutes: 30 }, fastFerry: true },
    { time: { hours: 17, minutes: 0  } },
    { time: { hours: 17, minutes: 30 }, fastFerry: true },
    { time: { hours: 18, minutes: 0  } },
    { time: { hours: 18, minutes: 30 }, fastFerry: true },
    { time: { hours: 19, minutes: 0  } },
    { time: { hours: 20, minutes: 0  }, fastFerry: true },
    { time: { hours: 21, minutes: 0  } },
    { time: { hours: 22, minutes: 0  }, fastFerry: true },
    { time: { hours: 23, minutes: 30 } },
  ],
};

export const CENTRAL_TO_CHEUNG_CHAU_SATURDAY: Timetable = {
  routeId,
  direction: "OUTBOUND",
  dayType: "SATURDAY",
  validFrom,
  validUntil: null,
  departures: [
    { time: { hours: 6,  minutes: 30 } },
    { time: { hours: 7,  minutes: 15 }, fastFerry: true },
    { time: { hours: 8,  minutes: 0  } },
    { time: { hours: 8,  minutes: 30 }, fastFerry: true },
    { time: { hours: 9,  minutes: 0  } },
    { time: { hours: 9,  minutes: 30 }, fastFerry: true },
    { time: { hours: 10, minutes: 0  } },
    { time: { hours: 10, minutes: 30 }, fastFerry: true },
    { time: { hours: 11, minutes: 0  } },
    { time: { hours: 11, minutes: 30 }, fastFerry: true },
    { time: { hours: 12, minutes: 0  } },
    { time: { hours: 12, minutes: 30 }, fastFerry: true },
    { time: { hours: 13, minutes: 0  } },
    { time: { hours: 13, minutes: 30 }, fastFerry: true },
    { time: { hours: 14, minutes: 0  } },
    { time: { hours: 14, minutes: 30 }, fastFerry: true },
    { time: { hours: 15, minutes: 0  } },
    { time: { hours: 15, minutes: 30 }, fastFerry: true },
    { time: { hours: 16, minutes: 0  } },
    { time: { hours: 16, minutes: 30 }, fastFerry: true },
    { time: { hours: 17, minutes: 0  } },
    { time: { hours: 17, minutes: 30 }, fastFerry: true },
    { time: { hours: 18, minutes: 0  } },
    { time: { hours: 19, minutes: 0  }, fastFerry: true },
    { time: { hours: 20, minutes: 0  } },
    { time: { hours: 21, minutes: 0  }, fastFerry: true },
    { time: { hours: 22, minutes: 0  } },
    { time: { hours: 23, minutes: 30 } },
  ],
};

// Sunday and Public Holiday share the same timetable
export const CENTRAL_TO_CHEUNG_CHAU_SUNDAY: Timetable = {
  routeId,
  direction: "OUTBOUND",
  dayType: "SUNDAY",
  validFrom,
  validUntil: null,
  departures: [
    { time: { hours: 6,  minutes: 30 } },
    { time: { hours: 7,  minutes: 30 }, fastFerry: true },
    { time: { hours: 8,  minutes: 30 } },
    { time: { hours: 9,  minutes: 30 }, fastFerry: true },
    { time: { hours: 10, minutes: 0  } },
    { time: { hours: 10, minutes: 30 }, fastFerry: true },
    { time: { hours: 11, minutes: 0  } },
    { time: { hours: 11, minutes: 30 }, fastFerry: true },
    { time: { hours: 12, minutes: 0  } },
    { time: { hours: 12, minutes: 30 }, fastFerry: true },
    { time: { hours: 13, minutes: 0  } },
    { time: { hours: 13, minutes: 30 }, fastFerry: true },
    { time: { hours: 14, minutes: 0  } },
    { time: { hours: 14, minutes: 30 }, fastFerry: true },
    { time: { hours: 15, minutes: 0  } },
    { time: { hours: 15, minutes: 30 }, fastFerry: true },
    { time: { hours: 16, minutes: 0  } },
    { time: { hours: 16, minutes: 30 }, fastFerry: true },
    { time: { hours: 17, minutes: 0  } },
    { time: { hours: 17, minutes: 30 }, fastFerry: true },
    { time: { hours: 18, minutes: 0  } },
    { time: { hours: 19, minutes: 0  }, fastFerry: true },
    { time: { hours: 20, minutes: 0  } },
    { time: { hours: 21, minutes: 0  }, fastFerry: true },
    { time: { hours: 22, minutes: 0  } },
    { time: { hours: 23, minutes: 30 } },
  ],
};

export const CENTRAL_TO_CHEUNG_CHAU_PUBLIC_HOLIDAY: Timetable = {
  ...CENTRAL_TO_CHEUNG_CHAU_SUNDAY,
  dayType: "PUBLIC_HOLIDAY",
};

// ---------------------------------------------------------------------------
// INBOUND — Cheung Chau → Central
// ---------------------------------------------------------------------------

export const CHEUNG_CHAU_TO_CENTRAL_WEEKDAY: Timetable = {
  routeId,
  direction: "INBOUND",
  dayType: "WEEKDAY",
  validFrom,
  validUntil: null,
  departures: [
    { time: { hours: 6,  minutes: 10 }, fastFerry: true },
    { time: { hours: 6,  minutes: 50 } },
    { time: { hours: 7,  minutes: 30 }, fastFerry: true },
    { time: { hours: 8,  minutes: 10 } },
    { time: { hours: 8,  minutes: 45 }, fastFerry: true },
    { time: { hours: 9,  minutes: 15 } },
    { time: { hours: 9,  minutes: 45 }, fastFerry: true },
    { time: { hours: 10, minutes: 15 } },
    { time: { hours: 10, minutes: 45 }, fastFerry: true },
    { time: { hours: 11, minutes: 15 } },
    { time: { hours: 11, minutes: 45 }, fastFerry: true },
    { time: { hours: 12, minutes: 15 } },
    { time: { hours: 12, minutes: 45 }, fastFerry: true },
    { time: { hours: 13, minutes: 15 } },
    { time: { hours: 13, minutes: 45 }, fastFerry: true },
    { time: { hours: 14, minutes: 15 } },
    { time: { hours: 14, minutes: 45 }, fastFerry: true },
    { time: { hours: 15, minutes: 15 } },
    { time: { hours: 15, minutes: 45 }, fastFerry: true },
    { time: { hours: 16, minutes: 15 } },
    { time: { hours: 16, minutes: 45 }, fastFerry: true },
    { time: { hours: 17, minutes: 30 } },
    { time: { hours: 18, minutes: 0  }, fastFerry: true },
    { time: { hours: 18, minutes: 45 } },
    { time: { hours: 19, minutes: 30 }, fastFerry: true },
    { time: { hours: 20, minutes: 30 } },
    { time: { hours: 21, minutes: 30 }, fastFerry: true },
    { time: { hours: 22, minutes: 30 } },
    { time: { hours: 23, minutes: 59 } },
  ],
};

export const CHEUNG_CHAU_TO_CENTRAL_SATURDAY: Timetable = {
  routeId,
  direction: "INBOUND",
  dayType: "SATURDAY",
  validFrom,
  validUntil: null,
  departures: [
    { time: { hours: 6,  minutes: 10 }, fastFerry: true },
    { time: { hours: 6,  minutes: 50 } },
    { time: { hours: 7,  minutes: 30 }, fastFerry: true },
    { time: { hours: 8,  minutes: 10 } },
    { time: { hours: 8,  minutes: 50 }, fastFerry: true },
    { time: { hours: 9,  minutes: 30 } },
    { time: { hours: 10, minutes: 0  }, fastFerry: true },
    { time: { hours: 10, minutes: 30 } },
    { time: { hours: 11, minutes: 0  }, fastFerry: true },
    { time: { hours: 11, minutes: 30 } },
    { time: { hours: 12, minutes: 0  }, fastFerry: true },
    { time: { hours: 12, minutes: 30 } },
    { time: { hours: 13, minutes: 0  }, fastFerry: true },
    { time: { hours: 13, minutes: 30 } },
    { time: { hours: 14, minutes: 0  }, fastFerry: true },
    { time: { hours: 14, minutes: 30 } },
    { time: { hours: 15, minutes: 0  }, fastFerry: true },
    { time: { hours: 15, minutes: 30 } },
    { time: { hours: 16, minutes: 0  }, fastFerry: true },
    { time: { hours: 16, minutes: 30 } },
    { time: { hours: 17, minutes: 0  }, fastFerry: true },
    { time: { hours: 18, minutes: 0  } },
    { time: { hours: 19, minutes: 0  }, fastFerry: true },
    { time: { hours: 20, minutes: 0  } },
    { time: { hours: 21, minutes: 0  }, fastFerry: true },
    { time: { hours: 22, minutes: 0  } },
    { time: { hours: 23, minutes: 59 } },
  ],
};

export const CHEUNG_CHAU_TO_CENTRAL_SUNDAY: Timetable = {
  routeId,
  direction: "INBOUND",
  dayType: "SUNDAY",
  validFrom,
  validUntil: null,
  departures: [
    { time: { hours: 6,  minutes: 10 }, fastFerry: true },
    { time: { hours: 7,  minutes: 0  } },
    { time: { hours: 7,  minutes: 50 }, fastFerry: true },
    { time: { hours: 8,  minutes: 50 } },
    { time: { hours: 9,  minutes: 30 }, fastFerry: true },
    { time: { hours: 10, minutes: 0  } },
    { time: { hours: 10, minutes: 30 }, fastFerry: true },
    { time: { hours: 11, minutes: 0  } },
    { time: { hours: 11, minutes: 30 }, fastFerry: true },
    { time: { hours: 12, minutes: 0  } },
    { time: { hours: 12, minutes: 30 }, fastFerry: true },
    { time: { hours: 13, minutes: 0  } },
    { time: { hours: 13, minutes: 30 }, fastFerry: true },
    { time: { hours: 14, minutes: 0  } },
    { time: { hours: 14, minutes: 30 }, fastFerry: true },
    { time: { hours: 15, minutes: 0  } },
    { time: { hours: 15, minutes: 30 }, fastFerry: true },
    { time: { hours: 16, minutes: 0  } },
    { time: { hours: 16, minutes: 30 }, fastFerry: true },
    { time: { hours: 17, minutes: 0  } },
    { time: { hours: 18, minutes: 0  }, fastFerry: true },
    { time: { hours: 19, minutes: 0  } },
    { time: { hours: 20, minutes: 0  }, fastFerry: true },
    { time: { hours: 21, minutes: 0  } },
    { time: { hours: 22, minutes: 0  }, fastFerry: true },
    { time: { hours: 23, minutes: 59 } },
  ],
};

export const CHEUNG_CHAU_TO_CENTRAL_PUBLIC_HOLIDAY: Timetable = {
  ...CHEUNG_CHAU_TO_CENTRAL_SUNDAY,
  dayType: "PUBLIC_HOLIDAY",
};

// Convenience array for repository consumption
export const ALL_CENTRAL_CHEUNG_CHAU_TIMETABLES: readonly Timetable[] = [
  CENTRAL_TO_CHEUNG_CHAU_WEEKDAY,
  CENTRAL_TO_CHEUNG_CHAU_SATURDAY,
  CENTRAL_TO_CHEUNG_CHAU_SUNDAY,
  CENTRAL_TO_CHEUNG_CHAU_PUBLIC_HOLIDAY,
  CHEUNG_CHAU_TO_CENTRAL_WEEKDAY,
  CHEUNG_CHAU_TO_CENTRAL_SATURDAY,
  CHEUNG_CHAU_TO_CENTRAL_SUNDAY,
  CHEUNG_CHAU_TO_CENTRAL_PUBLIC_HOLIDAY,
];
