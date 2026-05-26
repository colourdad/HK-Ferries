import { NextRequest, NextResponse } from "next/server";

// TODO: Implement in Phase 3
// This API route is the thin HTTP boundary — all logic lives in the application layer.
//
// GET /api/schedules?routeId=...&direction=...
// Response: GetNextDeparturesOutput

export async function GET(request: NextRequest) {
  void request;
  // TODO:
  // - Parse and validate routeId, direction from searchParams
  // - Get current HK date/time
  // - Call getNextDepartures from application/queries
  // - Return JSON response
  return NextResponse.json({ message: "Not implemented" }, { status: 501 });
}
