import { DateTime } from 'luxon';
import { Application } from '@gql/types/graphql';
import { useState } from 'react';
import CalendarDayView from './DayView';
import CalendarWeekView from './WeekView';

type Props = {
  isManageTimeslots?: boolean;
  isNewInterview?: boolean;
  application?: Application;
};

export default function Calendar({
  application,
  isNewInterview,
  isManageTimeslots,
}: Props) {
  const [selectedDay, setSelectedDay] = useState(DateTime.local());
  const [viewType, setViewType] = useState<'day' | 'week'>('week');

  return viewType === 'day' ? (
    <CalendarDayView
      application={application}
      isNewInterview={isNewInterview}
      isManageTimeslots={isManageTimeslots}
      setViewType={setViewType}
      viewType={viewType}
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
    />
  ) : (
    <CalendarWeekView
      application={application}
      isNewInterview={isNewInterview}
      isManageTimeslots={isManageTimeslots}
      setViewType={setViewType}
      viewType={viewType}
      selectedDay={selectedDay}
      setSelectedDay={setSelectedDay}
    />
  );
}
