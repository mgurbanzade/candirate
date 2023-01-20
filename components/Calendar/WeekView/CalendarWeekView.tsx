import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import useSession from '@hooks/useSession';
import MobileHeader from '../MobileHeader';
import CalendarHeader from '../Header';

import {
  MappedTimeslotType,
  TimelineEventTypes,
  UITimelineEventType,
} from '@lib/ui-types';
import { positionPath } from '@lib/routes';

import TimelineWeek from './TimelineWeek';
import WeekEvents from './WeekEvents';

import { Application } from '@gql/types/graphql';
import { GET_INTERVIEWS } from '@gql/queries/interviews';
import { APPLY_POSITION_MUTATION } from '@gql/mutations/positions';
import { GET_CALENDAR_DAY_TIMESLOTS as GET_CALENDAR_WEEK_TIMESLOTS } from '@gql/queries/timeslots';

import { getTimelineForWeek, mapInterviewsToTimeline } from '../helpers';

type Props = {
  isManageTimeslots?: boolean;
  isNewInterview?: boolean;
  application?: Application;
  viewType: 'day' | 'week';
  selectedDay: DateTime;
  setSelectedDay: (date: DateTime) => void;
  setViewType: (viewType: 'day' | 'week') => void;
};

export default function CalendarWeekView({
  setViewType,
  application,
  isNewInterview,
  isManageTimeslots,
  viewType,
  selectedDay,
  setSelectedDay,
}: Props) {
  const [applyToPositionMutation] = useMutation(APPLY_POSITION_MUTATION);
  const router = useRouter();
  const session = useSession();
  const [events, setEvents] = useState<UITimelineEventType[]>([]);
  const [timeslots, setTimeslots] = useState<MappedTimeslotType[]>([]);
  const isTimeslotMode = router.query?.s === 'enabled';
  const addedTimeSlots = !isTimeslotMode
    ? null
    : events.filter((e) => e.type === TimelineEventTypes.NEW_SLOT);

  const container = useRef<any>(null);
  const containerNav = useRef<any>(null);
  const containerOffset = useRef<any>(null);

  const { refetch: refetchInterviews } = useQuery(GET_INTERVIEWS, {
    variables: {
      getInterviewsWhereInput: {
        candidateId: session?.currentUser?.candidateId,
        recruiterId: session?.currentUser?.recruiterId,
        dayStart: selectedDay.startOf('week').toISO(),
        dayEnd: selectedDay.endOf('week').toISO(),
      },
    },
    onCompleted: (data) => {
      const dbEvents = mapInterviewsToTimeline(data.getInterviews);
      setEvents(dbEvents);
    },
  });

  const { refetch: refetchTimeslots } = useQuery(GET_CALENDAR_WEEK_TIMESLOTS, {
    variables: {
      where: {
        candidateId: application?.candidate?.id,
        startDate: selectedDay.startOf('week').toISO(),
        endDate: selectedDay.endOf('week').toISO(),
      },
    },
    skip:
      (!isNewInterview && !isManageTimeslots) || !application?.candidate?.id,
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

  const applyToPosition = !isTimeslotMode
    ? null
    : async () => {
        const quarterSlots = addedTimeSlots?.reduce((acc: any, slot) => {
          const res = [
            {
              startsAt: slot.startDate.toISO(),
              endsAt: slot.startDate.plus({ hours: 0.25 }).toISO(),
            },
          ];

          for (let i = 1; i < slot.duration / 0.25; i += 1) {
            res.push({
              startsAt: slot.startDate.plus({ hours: i * 0.25 }).toISO(),
              endsAt: slot.startDate.plus({ hours: i * 0.25 + 0.25 }).toISO(),
            });
          }

          return [...acc, ...res];
        }, []);

        try {
          const { data } = await applyToPositionMutation({
            variables: {
              applyToPositionInput: {
                positionUuid: router?.query?.p as string,
                candidateId: session?.currentUser?.candidateId as number,
                timeslots: quarterSlots as {
                  startsAt: string;
                  endsAt: string;
                }[],
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

  const timelineData = getTimelineForWeek(
    DateTime.fromFormat(selectedDay.toISODate(), 'yyyy-MM-dd'),
    timeslots,
  );

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60;
    const containerScrollHeight = (container?.current as any)?.scrollHeight;
    const navOffsetHeight = (containerNav?.current as any)?.offsetHeight - 48;
    const containerOffsetHeight = (containerOffset?.current as any)
      ?.offsetHeight;

    container.current.scrollTop =
      ((containerScrollHeight - navOffsetHeight - containerOffsetHeight) *
        currentMinute) /
      1440;
  }, []);

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
        className="flex h-full flex-col rounded-lg"
        style={{
          maxHeight: isNewInterview ? 'auto' : 'calc(100vh - 3rem)',
        }}
      >
        <CalendarHeader
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          isManageTimeslots={isManageTimeslots}
          setViewType={setViewType}
          viewType={viewType}
        />
        <div
          ref={container}
          className="isolate flex flex-auto flex-col bg-white overflow-scroll"
        >
          <div className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
            <MobileHeader
              viewType={viewType}
              setViewType={setViewType}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              ref={containerNav}
            />
            <div className="flex flex-auto overflow-y-scroll">
              <div className="sticky left-0 w-14 flex-none bg-white" />
              <div className="grid flex-auto grid-cols-7">
                {timelineData.map((line, index) => (
                  <TimelineWeek
                    key={index + Date.now()}
                    timeslots={timeslots}
                    setEvents={setEvents}
                    selectedDay={selectedDay}
                    application={application}
                    isTimeslotMode={isTimeslotMode}
                    isManageTimeslots={isManageTimeslots}
                    isNewInterview={isNewInterview}
                    containerOffset={containerOffset}
                    timelineData={line}
                    order={index + 1}
                    refetchInterviews={refetchInterviews}
                    refetchTimeslots={refetchTimeslots}
                  />
                ))}
                <WeekEvents
                  events={[...events]}
                  setEvents={setEvents}
                  refetchEvents={refetchInterviews}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
