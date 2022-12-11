import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';
import { useEffect, useRef, useState } from 'react';
import { Application } from '@gql/types/graphql';
import { UIInteviewType } from '@lib/ui-types';
import { GET_INTERVIEWS } from '@gql/queries/interviews';
import useSession from '@hooks/useSession';
import CalendarHeader from './Header';
import Timeline from './Timeline';
import Events from './Events';
import Datepicker from './Datepicker';
import MobileHeader from './MobileHeader';
import { mapInterviewsToTimeline } from './helpers';

type Props = {
  isNewInterview?: boolean;
  application?: Application;
};

export default function Calendar({ application, isNewInterview }: Props) {
  const [today] = useState(DateTime.local());
  const [selectedDay, setSelectedDay] = useState(today);
  const [events, setEvents] = useState<UIInteviewType[]>([]);

  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const session = useSession();
  const { refetch } = useQuery(GET_INTERVIEWS, {
    variables: {
      getInterviewsWhereInput: {
        recruiterId: session?.currentUser?.recruiterId,
        dayStart: selectedDay.startOf('day').toISO(),
        dayEnd: selectedDay.endOf('day').toISO(),
      },
    },
    onCompleted: (data) => {
      const dbEvents = mapInterviewsToTimeline(data.getInterviews);
      setEvents(dbEvents);
    },
  });

  useEffect(() => {
    // Set the container scroll position based on the current time.
    // const currentMinute = new Date().getHours() * 60;
    // container.current.scrollTop =
    //   ((container?.current?.scrollHeight -
    //     containerNav?.current?.offsetHeight -
    //     containerOffset?.current?.offsetHeight) *
    //     currentMinute) /
    //   1440;
  }, []);

  return (
    <div className="flex h-full flex-col">
      <CalendarHeader
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <div ref={container} className="flex flex-auto flex-col overflow-auto">
          <MobileHeader containerNav={containerNav} />
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Events */}
              <Events
                events={events}
                setEvents={setEvents}
                refetchEvents={refetch}
              />
              {/* Timeline */}
              <Timeline
                containerOffset={containerOffset}
                selectedDay={selectedDay}
                setEvents={setEvents}
                application={application}
                isNewInterview={isNewInterview}
              />
            </div>
          </div>
        </div>
        <Datepicker selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </div>
    </div>
  );
}
