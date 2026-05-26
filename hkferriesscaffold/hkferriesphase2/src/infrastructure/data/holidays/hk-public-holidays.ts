import type { PublicHoliday } from "../../../domain/models/timetable";
import { toISODateString } from "../../../domain/models/timetable";

// Source: https://www.gov.hk/en/about/abouthk/holiday/
// Last verified: May 2026. Re-verify annually — lunar-based dates shift each year.

export const HK_PUBLIC_HOLIDAYS_2025: readonly PublicHoliday[] = [
  { date: toISODateString("2025-01-01"), name: "New Year's Day",                           nameZh: "元旦" },
  { date: toISODateString("2025-01-29"), name: "Lunar New Year's Day",                     nameZh: "農曆年初一" },
  { date: toISODateString("2025-01-30"), name: "Second day of Lunar New Year",              nameZh: "農曆年初二" },
  { date: toISODateString("2025-01-31"), name: "Third day of Lunar New Year",               nameZh: "農曆年初三" },
  { date: toISODateString("2025-04-04"), name: "Ching Ming Festival",                       nameZh: "清明節" },
  { date: toISODateString("2025-04-18"), name: "Good Friday",                               nameZh: "耶穌受難節" },
  { date: toISODateString("2025-04-19"), name: "Day following Good Friday",                 nameZh: "耶穌受難節翌日" },
  { date: toISODateString("2025-04-21"), name: "Easter Monday",                             nameZh: "復活節星期一" },
  { date: toISODateString("2025-05-01"), name: "Labour Day",                                nameZh: "勞動節" },
  { date: toISODateString("2025-05-05"), name: "Birthday of the Buddha",                   nameZh: "佛誕" },
  { date: toISODateString("2025-05-31"), name: "Tuen Ng Festival",                          nameZh: "端午節" },
  { date: toISODateString("2025-07-01"), name: "Hong Kong SAR Establishment Day",           nameZh: "香港特別行政區成立紀念日" },
  { date: toISODateString("2025-09-26"), name: "Day following Mid-Autumn Festival",         nameZh: "中秋節翌日" },
  { date: toISODateString("2025-10-01"), name: "National Day",                              nameZh: "國慶日" },
  { date: toISODateString("2025-10-07"), name: "Chung Yeung Festival",                      nameZh: "重陽節" }, // TODO: verify exact date against gov.hk
  { date: toISODateString("2025-12-25"), name: "Christmas Day",                             nameZh: "聖誕節" },
  { date: toISODateString("2025-12-26"), name: "First weekday after Christmas Day",         nameZh: "聖誕節後第一個週日" },
];

// Source: https://www.info.gov.hk/gia/general/202505/16/P2025051300353.htm (gazetted May 2025)
// Notes from gazette:
// - Ching Ming (Apr 5, Sunday) → substitute Apr 7 (Tuesday) as Easter Monday occupies Apr 6
// - Birthday of the Buddha (May 24, Sunday) → substitute May 25 (Monday)
// - Chung Yeung Festival (Oct 18, Sunday) → substitute Oct 19 (Monday)
export const HK_PUBLIC_HOLIDAYS_2026: readonly PublicHoliday[] = [
  { date: toISODateString("2026-01-01"), name: "New Year's Day",                           nameZh: "元旦" },
  { date: toISODateString("2026-02-17"), name: "Lunar New Year's Day",                     nameZh: "農曆年初一" },
  { date: toISODateString("2026-02-18"), name: "Second day of Lunar New Year",              nameZh: "農曆年初二" },
  { date: toISODateString("2026-02-19"), name: "Third day of Lunar New Year",               nameZh: "農曆年初三" },
  { date: toISODateString("2026-04-03"), name: "Good Friday",                               nameZh: "耶穌受難節" },
  { date: toISODateString("2026-04-04"), name: "Day following Good Friday",                 nameZh: "耶穌受難節翌日" },
  { date: toISODateString("2026-04-06"), name: "Easter Monday",                             nameZh: "復活節星期一" },
  { date: toISODateString("2026-04-07"), name: "Ching Ming Festival (substitute)",          nameZh: "清明節（代替日）" },
  { date: toISODateString("2026-05-01"), name: "Labour Day",                                nameZh: "勞動節" },
  { date: toISODateString("2026-05-25"), name: "Birthday of the Buddha (substitute)",      nameZh: "佛誕（代替日）" },
  { date: toISODateString("2026-06-19"), name: "Tuen Ng Festival",                          nameZh: "端午節" },
  { date: toISODateString("2026-07-01"), name: "Hong Kong SAR Establishment Day",           nameZh: "香港特別行政區成立紀念日" },
  { date: toISODateString("2026-09-29"), name: "Day following Mid-Autumn Festival",         nameZh: "中秋節翌日" }, // TODO: verify — Mid-Autumn falls Sep 28
  { date: toISODateString("2026-10-01"), name: "National Day",                              nameZh: "國慶日" },
  { date: toISODateString("2026-10-19"), name: "Chung Yeung Festival (substitute)",         nameZh: "重陽節（代替日）" },
  { date: toISODateString("2026-12-25"), name: "Christmas Day",                             nameZh: "聖誕節" },
  { date: toISODateString("2026-12-26"), name: "First weekday after Christmas Day",         nameZh: "聖誕節後第一個週日" },
];
