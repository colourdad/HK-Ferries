interface RoutePageProps {
  params: Promise<{ routeId: string }>;
}

// TODO: Implement route detail page in Phase 4
// - Fetch route + full schedule via getRouteSchedule query
// - Render DayTypeTabs + TimetableGrid
// - Default tab to today's ScheduleDayType
// - Show route name and direction switcher

export default async function RoutePage({ params }: RoutePageProps) {
  const { routeId } = await params;
  void routeId;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-muted-foreground">Schedule — coming soon</p>
    </div>
  );
}
