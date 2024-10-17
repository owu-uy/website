import { TimelineWrapper, TimelineBox, TimelineTime, TimelineDivider, TimelineDividers, useTimeline } from "planby";

interface TimelineProps {
  isBaseTimeFormat: boolean;
  isSidebar: boolean;
  dayWidth: number;
  hourWidth: number;
  numberOfHoursInDay: number;
  offsetStartHoursRange: number;
  sidebarWidth: number;
}

export function Timeline({
  isBaseTimeFormat,
  isSidebar,
  dayWidth,
  hourWidth,
  numberOfHoursInDay,
  offsetStartHoursRange,
  sidebarWidth,
}: TimelineProps) {
  const { time, dividers, formatTime } = useTimeline(numberOfHoursInDay, isBaseTimeFormat);

  const renderTime = (index: number) => (
    <TimelineBox key={index} width={hourWidth}>
      <TimelineTime>{formatTime(index + offsetStartHoursRange).toLowerCase()}</TimelineTime>
      <TimelineDividers>{renderDividers()}</TimelineDividers>
    </TimelineBox>
  );

  const renderDividers = () => dividers.map((_, index) => <TimelineDivider key={index} width={hourWidth} />);

  return (
    <TimelineWrapper dayWidth={dayWidth} isSidebar={isSidebar} sidebarWidth={sidebarWidth}>
      {time.map((_, index) => renderTime(index))}
    </TimelineWrapper>
  );
}
