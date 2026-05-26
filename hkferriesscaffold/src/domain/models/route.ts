/** Opaque brand — prevents plain strings from being passed as RouteIds */
export type RouteId = string & { readonly __brand: "RouteId" };

export function toRouteId(value: string): RouteId {
  return value as RouteId;
}

export type Direction = "OUTBOUND" | "INBOUND";

export interface Terminal {
  readonly id: string;
  readonly name: string;
  readonly nameZh: string;
  readonly district: string;
  // TODO: Add coordinates { lat, lng } in Phase 6 when map view is added
}

export interface Route {
  readonly id: RouteId;
  readonly name: string;
  readonly nameZh: string;
  readonly operator: string;
  readonly origin: Terminal;
  readonly destination: Terminal;
}
