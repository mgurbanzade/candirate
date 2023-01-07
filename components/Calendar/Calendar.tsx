import Events from './Events';
import Timeline from './Timeline';
import useSession from '@hooks/useSession';
import Datepicker from './Datepicker';
import MobileHeader from './MobileHeader';
import CalendarHeader from './Header';

import { useQuery, useMutation } from '@apollo/client';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { Application } from '@gql/types/graphql';
import { TimelineEventTypes, UITimelineEventType } from '@lib/ui-types';
import { GET_INTERVIEWS } from '@gql/queries/interviews';
import {
  // UPDATE_POSITION_MUTATION,
  APPLY_POSITION_MUTATION,
} from '@gql/mutations/positions';
import { GET_CALENDAR_DAY_TIMESLOTS } from '@gql/queries/timeslots';
import { mapInterviewsToTimeline, mapTimeslotsToTimeline } from './helpers';
import { useEffect, useRef, useState } from 'react';
import { positionPath } from '@lib/routes';

type Props = {
  isNewInterview?: boolean;
  application?: Application;
};

export default function Calendar({ application, isNewInterview }: Props) {
  const [applyToPositionMutation] = useMutation(APPLY_POSITION_MUTATION);
  const router = useRouter();
  const session = useSession();

  const [today] = useState(DateTime.local());
  const [selectedDay, setSelectedDay] = useState(today);
  const [events, setEvents] = useState<UITimelineEventType[]>([]);
  const isTimeslotMode = router.query?.s === 'enabled';
  const addedTimeSlots = !isTimeslotMode
    ? null
    : events.filter((e) => e.type === TimelineEventTypes.NEW_SLOT);

  const container = useRef(null);
  const containerNav = useRef(null);
  const containerOffset = useRef(null);

  const { refetch } = useQuery(GET_INTERVIEWS, {
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

  const { data } = useQuery(GET_CALENDAR_DAY_TIMESLOTS, {
    variables: {
      where: {
        candidateId: application?.candidate?.id,
        startDate: selectedDay.startOf('day').toISO(),
        endDate: selectedDay.endOf('day').toISO(),
      },
    },
    skip: !isNewInterview,
    onCompleted: (data) => {
      const timeslots = mapTimeslotsToTimeline(data.getCalendarDayTimeslots);
      setEvents(timeslots);
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

  const applyToPosition = !isTimeslotMode
    ? null
    : async () => {
        try {
          const { data } = await applyToPositionMutation({
            variables: {
              applyToPositionInput: {
                positionUuid: router?.query?.p as string,
                candidateId: session?.currentUser?.candidateId as number,
                timeslots: addedTimeSlots?.map((slot) => ({
                  startsAt: slot.startDate.toISO(),
                  endsAt: slot.startDate.plus({ hours: slot.duration }).toISO(),
                })) as { startsAt: string; endsAt: string }[],
              },
            },
          });

          if (data?.applyToPosition) {
            router.push(positionPath(router?.query?.p as string));
          }
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <>
      {isTimeslotMode && (
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
            Provide your time slots
          </h1>

          <button
            type="button"
            disabled={addedTimeSlots?.length === 0}
            onClick={applyToPosition as any}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 disabled:opacity-50 disabled:hover:bg-blue-600 disabled:cursor-not-allowed"
          >
            Submit time slots
          </button>
        </div>
      )}
      <div
        className="flex h-full flex-col"
        style={{
          maxHeight: isNewInterview ? 'auto' : 'calc(100vh - 50px)',
        }}
      >
        <CalendarHeader
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
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
                  events={events}
                  setEvents={setEvents}
                  refetchEvents={refetch}
                />
                <Timeline
                  setEvents={setEvents}
                  isTimeslot={isTimeslotMode}
                  application={application}
                  selectedDay={selectedDay}
                  containerOffset={containerOffset}
                  isNewInterview={isNewInterview}
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
