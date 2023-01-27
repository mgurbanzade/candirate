import { DateTime } from 'luxon';
import { useRouter } from 'next/router';
import { Application } from '@gql/types/graphql';
import {
  MappedTimeslotType,
  TimelineEventTypes,
  UITimelineEventType,
} from '@lib/ui-types';
import useNotification from '@hooks/useNotification';
import { useMutation } from '@apollo/client';
import { CREATE_TIMESLOT, DELETE_TIMESLOT } from '@gql/mutations/timeslots';

import { getTimelineForDate } from '../helpers';

import TimelineCell from './TimelineDayCell';

type Props = {
  containerOffset: React.RefObject<HTMLDivElement>;
  selectedDay: DateTime;
  setEvents: React.Dispatch<React.SetStateAction<UITimelineEventType[]>>;
  application?: Application;
  isNewInterview?: boolean;
  isTimeslotMode?: boolean;
  isManageTimeslots?: boolean;
  timeslots?: MappedTimeslotType[];
  refetchInterviews?: () => void;
  refetchTimeslots?: () => void;
};

const Timeline = ({
  containerOffset,
  selectedDay,
  setEvents,
  isNewInterview,
  isTimeslotMode,
  application,
  timeslots,
  refetchInterviews,
  refetchTimeslots,
  isManageTimeslots,
}: Props) => {
  const router = useRouter();
  const { setNotification } = useNotification();
  const [createTimeslot] = useMutation(CREATE_TIMESLOT);
  const [deleteTimeslot] = useMutation(DELETE_TIMESLOT);

  const handleCreateTimeslot = async (startsAt: DateTime) => {
    try {
      const { data } = await createTimeslot({
        variables: {
          candidateId: application?.candidate?.id as number,
          applicationId: application?.id as number,
          createTimeslotInput: {
            startsAt: startsAt.toISO(),
            endsAt: startsAt.plus({ minutes: 15 }).toISO(),
          },
        },
      });

      if (data?.createTimeslot?.id) {
        if (refetchTimeslots) refetchTimeslots();
        if (refetchInterviews) refetchInterviews();
      }
    } catch (error) {
      setNotification({
        isVisible: true,
        type: 'error',
        title: 'Something went wrong',
        description: 'Please try again later.',
      });
    }
  };

  const handleDeleteTimeslot = async (id: number) => {
    try {
      const { data } = await deleteTimeslot({
        variables: {
          id,
        },
      });

      if (data?.deleteTimeslot?.__typename) {
        if (refetchTimeslots) refetchTimeslots();
        if (refetchInterviews) refetchInterviews();
      }
    } catch (error) {
      setNotification({
        isVisible: true,
        type: 'error',
        title: 'Something went wrong',
        description: 'Please try again later.',
      });
    }
  };

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
        ...prev.filter(
          (e) =>
            Number(e.id) !== Number(router?.query?.i) &&
            e.type !== TimelineEventTypes.EVENT,
        ),
        newEvent,
      ]);
    };

    const regularClickHandler = isTimeslotMode ? createSlot : createEvent;

    const manageTimeslotsClickHandler = cell.isFreeTimeslot
      ? () => handleDeleteTimeslot(cell.timeslotId)
      : () => handleCreateTimeslot(cell.hour);

    return (
      <TimelineCell
        key={cell.id}
        onClick={
          isManageTimeslots ? manageTimeslotsClickHandler : regularClickHandler
        }
        setEvents={setEvents}
        isNewInterview={isNewInterview}
        isTimeslotMode={isTimeslotMode}
        isManageTimeslots={isManageTimeslots}
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
