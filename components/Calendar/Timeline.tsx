import { DateTime } from 'luxon';
import { Application } from '@gql/types/graphql';
import TimelineCell from './TimelineCell';
import { getTimelineForDate } from './helpers';
import { UIInteviewType } from '@lib/ui-types';

type Props = {
  containerOffset: React.RefObject<HTMLDivElement>;
  selectedDay: DateTime;
  setEvents: React.Dispatch<React.SetStateAction<UIInteviewType[]>>;
  application?: Application;
  isNewInterview?: boolean;
};

const Timeline = ({
  containerOffset,
  selectedDay,
  setEvents,
  isNewInterview,
  application,
}: Props) => {
  const timelineData = getTimelineForDate(
    DateTime.fromFormat(selectedDay.toISODate(), 'yyyy-MM-dd'),
  );

  const timeline = timelineData.map((cell) => {
    const createEvent = () => {
      const newEvent = {
        application,
        id: cell.id + Math.random(),
        isNew: true,
        title: `${application?.position?.title} Interview with ${application?.candidate?.user?.firstname}`,
        startDate: cell.hour,
        startStr: cell.hourStr,
        duration: 0.5,
      };
      setEvents((prev) => [...prev, newEvent]);
    };

    return (
      <TimelineCell
        key={cell.id}
        onClick={createEvent}
        setEvents={setEvents}
        isNewInterview={isNewInterview}
        {...cell}
      />
    );
  });

  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
      style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
    >
      <div ref={containerOffset} className="row-end-1 h-7"></div>
      {timeline}
    </div>
  );
};

export default Timeline;
