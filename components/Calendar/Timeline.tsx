import { DateTime } from 'luxon';
import { Application } from '@gql/types/graphql';
import {
  MappedTimeslotType,
  TimelineEventTypes,
  UITimelineEventType,
} from '@lib/ui-types';
import { getTimelineForDate } from './helpers';

import TimelineCell from './TimelineCell';

type Props = {
  containerOffset: React.RefObject<HTMLDivElement>;
  selectedDay: DateTime;
  setEvents: React.Dispatch<React.SetStateAction<UITimelineEventType[]>>;
  application?: Application;
  isNewInterview?: boolean;
  isTimeslotMode?: boolean;
  timeslots?: MappedTimeslotType[];
};

const Timeline = ({
  containerOffset,
  selectedDay,
  setEvents,
  isNewInterview,
  isTimeslotMode,
  application,
  timeslots,
}: Props) => {
  const timelineData = getTimelineForDate(
    DateTime.fromFormat(selectedDay.toISODate(), 'yyyy-MM-dd'),
    timeslots,
  );

  const timeline = timelineData.map((cell) => {
    const createSlot = () => {
      const newSlot = {
        id: cell.id + Math.random(),
        type: TimelineEventTypes.NEW_SLOT,
        title: 'New time slot',
        startDate: cell.hour,
        endDate: cell.hour.plus({ minutes: 15 }),
        startStr: cell.hourStr,
        endStr: cell.hour.plus({ minutes: 15 }).toFormat('hh:ma'),
        duration: 0.25,
      };

      setEvents((prev) => [...prev, newSlot]);
    };

    const createEvent = () => {
      const newEvent = {
        application,
        id: cell.id + Math.random(),
        type: TimelineEventTypes.EVENT,
        title: `${application?.position?.title} Interview with ${application?.candidate?.user?.firstname}`,
        startDate: cell.hour,
        endDate: cell.hour.plus({ minutes: 15 }),
        startStr: cell.hourStr,
        endStr: cell.hour.plus({ minutes: 15 }).toFormat('hh:ma'),
        duration: 0.25,
      };

      setEvents((prev) => [
        ...prev.filter((e) => e.type !== TimelineEventTypes.EVENT),
        newEvent,
      ]);
    };

    return (
      <TimelineCell
        key={cell.id}
        onClick={isTimeslotMode ? createSlot : createEvent}
        setEvents={setEvents}
        isNewInterview={isNewInterview}
        isTimeslotMode={isTimeslotMode}
        {...cell}
      />
    );
  });

  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
      style={{ gridTemplateRows: 'repeat(96, minmax(1.5rem, 1fr))' }}
    >
      <div ref={containerOffset} className="row-end-1 h-7"></div>
      {timeline}
    </div>
  );
};

export default Timeline;
