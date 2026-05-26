import type { ScheduleDayType } from "../../domain/models/schedule-day-type";

interface DayTypeTabsProps {
  activeTab: ScheduleDayType;
  onChange: (dayType: ScheduleDayType) => void;
  availableTabs: ScheduleDayType[];
}

// TODO: Implement in Phase 4
// - Use shadcn/ui Tabs component
// - Only show tabs that have a non-null timetable
// - Default to the tab matching today's ScheduleDayType
export function DayTypeTabs({
  activeTab,
  onChange,
  availableTabs,
}: DayTypeTabsProps) {
  void activeTab;
  void onChange;
  void availableTabs;
  return null;
}
