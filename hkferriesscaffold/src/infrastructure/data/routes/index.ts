import type { Route } from "../../../domain/models/route";
import { toRouteId } from "../../../domain/models/route";

// TODO: Populate with real routes from operator timetable PDFs.
// Operators to cover: New World First Ferry, Fortune Ferry, Mui Wo Ferry Services.
export const ROUTES: readonly Route[] = [
  {
    id: toRouteId("central-cheung-chau"),
    name: "Central ↔ Cheung Chau",
    nameZh: "中環 ↔ 長洲",
    operator: "New World First Ferry",
    origin: {
      id: "central-pier-5",
      name: "Central Pier 5",
      nameZh: "中環5號碼頭",
      district: "Central",
    },
    destination: {
      id: "cheung-chau-ferry-pier",
      name: "Cheung Chau Ferry Pier",
      nameZh: "長洲渡輪碼頭",
      district: "Cheung Chau",
    },
  },
  {
    id: toRouteId("central-mui-wo"),
    name: "Central ↔ Mui Wo",
    nameZh: "中環 ↔ 梅窩",
    operator: "New World First Ferry",
    origin: {
      id: "central-pier-6",
      name: "Central Pier 6",
      nameZh: "中環6號碼頭",
      district: "Central",
    },
    destination: {
      id: "mui-wo-ferry-pier",
      name: "Mui Wo Ferry Pier",
      nameZh: "梅窩渡輪碼頭",
      district: "Mui Wo",
    },
  },
  // TODO: Add remaining routes:
  // - Central ↔ Peng Chau
  // - Central ↔ Chi Ma Wan
  // - Inter-island routes
];
