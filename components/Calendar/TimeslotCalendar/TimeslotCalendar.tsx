import Events from '../Events';
import TimeslotTimeline from './TimeslotTimeline';
import useSession from '@hooks/useSession';
import Datepicker from '../Datepicker';
import MobileHeader from '../MobileHeader';
import CalendarHeader from '../Header';

import { useQuery } from '@apollo/client';
import { DateTime } from 'luxon';
import { Application } from '@gql/types/graphql';
import { MappedTimeslotType, UITimelineEventType } from '@lib/ui-types';
import { GET_INTERVIEWS } from '@gql/queries/interviews';
import { GET_CALENDAR_DAY_TIMESLOTS } from '@gql/queries/timeslots';
import { mapInterviewsToTimeline } from '../helpers';
import { useEffect, useRef, useState } from 'react';

type Props = {
  isManageTimeslots?: boolean;
  application?: Application;
};

export default function TimeslotCalendar({ application }: Props) {
  const session = useSession();

  const [today] = useState(DateTime.local());
  const [selectedDay, setSelectedDay] = useState(today);
  const [events, setEvents] = useState<UITimelineEventType[]>([]);
  const [timeslots, setTimeslots] = useState<MappedTimeslotType[]>([]);
  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const { refetch: refetchInterviews } = useQuery(GET_INTERVIEWS, {
    variables: {
      getInterviewsWhereInput: {
        candidateId: session?.currentUser?.candidateId,
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

  const { refetch: refetchTimeslots } = useQuery(GET_CALENDAR_DAY_TIMESLOTS, {
    variables: {
      where: {
        candidateId: application?.candidate?.id,
        startDate: selectedDay.startOf('day').toISO(),
        endDate: selectedDay.endOf('day').toISO(),
      },
    },
    onCompleted: (data) => {
      setTimeslots(
        data?.getCalendarDayTimeslots?.map((timeslot) => ({
          id: timeslot?.id as number,
          startDate: DateTime.fromISO(timeslot?.startsAt),
          endDate: DateTime.fromISO(timeslot?.endsAt),
        })),
      );
    },
  });

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    (container as any).current.scrollTop =
      (((container?.current as any).scrollHeight -
        (containerNav?.current as any).offsetHeight -
        (containerOffset?.current as any).offsetHeight) *
        currentMinute) /
      1440;
  }, []);

  return (
    <>
      <div
        className="flex h-full flex-col"
        style={{
          maxHeight: 'calc(100vh - 50px)',
        }}
      >
        <CalendarHeader
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          isManageTimeslots
        />
        <div className="isolate flex flex-auto overflow-hidden bg-white">
          <div
            ref={container}
            className="flex flex-auto flex-col overflow-auto overflow-x-hidden"
          >
            <MobileHeader
              ref={containerNav}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
            <div className="flex w-full flex-auto">
              <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
              <div className="grid flex-auto grid-cols-1 grid-rows-1">
                <Events
                  events={[...events]}
                  setEvents={setEvents}
                  refetchEvents={refetchInterviews}
                />
                <TimeslotTimeline
                  timeslots={timeslots}
                  selectedDay={selectedDay}
                  application={application}
                  containerOffset={containerOffset}
                  refetchInterviews={refetchInterviews}
                  refetchTimeslots={refetchTimeslots}
                />
              </div>
            </div>
          </div>
          <Datepicker
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </div>
      </div>
    </>
  );
}
