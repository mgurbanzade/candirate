import Events from './Events';
import Timeline from './TimelineDay';
import useSession from '@hooks/useSession';
import Datepicker from '../Datepicker';
import MobileHeader from '../MobileHeader';
import CalendarHeader from '../Header';

import { useQuery, useMutation } from '@apollo/client';
import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { Application } from '@gql/types/graphql';
import {
  MappedTimeslotType,
  TimelineEventTypes,
  UITimelineEventType,
} from '@lib/ui-types';
import { GET_INTERVIEWS } from '@gql/queries/interviews';
import { APPLY_POSITION_MUTATION } from '@gql/mutations/positions';
import { GET_CALENDAR_DAY_TIMESLOTS } from '@gql/queries/timeslots';
import { mapInterviewsToTimeline } from '../helpers';
import { useEffect, useRef, useState } from 'react';
import { positionPath } from '@lib/routes';

type Props = {
  isManageTimeslots?: boolean;
  isNewInterview?: boolean;
  application?: Application;
  selectedDay: DateTime;
  setSelectedDay: (date: DateTime) => void;
  setViewType: (viewType: 'day' | 'week') => void;
  viewType: 'day' | 'week';
};

export default function CalendarDayView({
  application,
  isNewInterview,
  isManageTimeslots,
  setViewType,
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
    skip: !isNewInterview && !isManageTimeslots,
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
    const containerScrollHeight = (container?.current as any)?.scrollHeight;
    const navOffsetHeight = (containerNav?.current as any)?.offsetHeight;
    const containerOffsetHeight = (containerOffset?.current as any)
      ?.offsetHeight;

    container.current.scrollTop =
      ((containerScrollHeight - navOffsetHeight - containerOffsetHeight) *
        currentMinute) /
      1440;
  }, []);

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
        <div className="isolate flex flex-auto overflow-hidden bg-white">
          <div
            ref={container}
            className="flex flex-auto flex-col overflow-auto overflow-x-hidden"
          >
            <MobileHeader
              viewType="day"
              setViewType={setViewType}
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
                <Timeline
                  timeslots={timeslots}
                  setEvents={setEvents}
                  selectedDay={selectedDay}
                  application={application}
                  isTimeslotMode={isTimeslotMode}
                  isNewInterview={isNewInterview}
                  containerOffset={containerOffset}
                  isManageTimeslots={isManageTimeslots}
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
