import { describe, it, expect } from "vitest";
import { getRouteSchedule } from "../../../src/application/queries/get-route-schedule";
import { toRouteId } from "../../../src/domain/models/route";
import { JsonRouteRepository } from "../../../src/infrastructure/repositories/json-route.repository";
import { JsonTimetableRepository } from "../../../src/infrastructure/repositories/json-timetable.repository";

const routeRepo = new JsonRouteRepository();
const timetableRepo = new JsonTimetableRepository();
const routeId = toRouteId("central-cheung-chau");

describe("getRouteSchedule", () => {
  it("returns a full schedule view for a known route", () => {
    const view = getRouteSchedule(routeId, "OUTBOUND", routeRepo, timetableRepo);

    expect(view).not.toBeNull();
    expect(view!.route.id).toBe(routeId);
    expect(view!.direction).toBe("OUTBOUND");
    expect(view!.weekday).not.toBeNull();
    expect(view!.saturday).not.toBeNull();
    expect(view!.sunday).not.toBeNull();
    expect(view!.publicHoliday).not.toBeNull();
  });

  it("returns a full inbound schedule", () => {
    const view = getRouteSchedule(routeId, "INBOUND", routeRepo, timetableRepo);
    expect(view).not.toBeNull();
    expect(view!.direction).toBe("INBOUND");
    expect(view!.weekday).not.toBeNull();
  });

  it("returns null for an unknown route", () => {
    expect(
      getRouteSchedule(toRouteId("unknown"), "OUTBOUND", routeRepo, timetableRepo)
    ).toBeNull();
  });

  it("includes correct route metadata", () => {
    const view = getRouteSchedule(routeId, "OUTBOUND", routeRepo, timetableRepo)!;
    expect(view.route.operator).toBe("New World First Ferry");
    expect(view.route.origin.id).toBe("central-pier-5");
    expect(view.route.destination.id).toBe("cheung-chau-ferry-pier");
  });
});
