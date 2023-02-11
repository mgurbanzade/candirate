import { DateTime } from 'luxon';
import { Application } from '@gql/types/graphql';
import {
  MappedTimeslotType,
  TimelineEventTypes,
  UITimelineEventType,
} from '@lib/ui-types';
import TimelineWeekCell from './TimelineWeekCell';
import useNotification from '@hooks/useNotification';
import { useMutation } from '@apollo/client';
import { CREATE_TIMESLOT, DELETE_TIMESLOT } from '@gql/mutations/timeslots';
import { useRouter } from 'next/router';

type Props = {
  containerOffset: React.RefObject<HTMLDivElement>;
  selectedDay: DateTime;
  setEvents: React.Dispatch<React.SetStateAction<UITimelineEventType[]>>;
  application?: Application;
  isNewInterview?: boolean;
  isTimeslotMode?: boolean;
  timeslots?: MappedTimeslotType[];
  timelineData: any[];
  order: number;
  refetchInterviews?: () => void;
  refetchTimeslots?: () => void;
  isManageTimeslots?: boolean;
};

const TimelineWeek = ({
  containerOffset,
  setEvents,
  isNewInterview,
  isTimeslotMode,
  application,
  timelineData,
  order,
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
          candidateId: application?.candidate?.id as number,
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

      setEvents((prev) => {
        return [
          ...prev.filter(
            (e) =>
              Number(e.id) !== Number(router?.query?.i) &&
              e.type !== TimelineEventTypes.EVENT,
          ),
          newEvent,
        ];
      });
    };

    const regularClickHandler = isTimeslotMode ? createSlot : createEvent;

    const manageTimeslotsClickHandler = cell.isFreeTimeslot
      ? () => handleDeleteTimeslot(cell.timeslotId)
      : () => handleCreateTimeslot(cell.hour);

    return (
      <TimelineWeekCell
        key={cell.id}
        onClick={
          isManageTimeslots ? manageTimeslotsClickHandler : regularClickHandler
        }
        setEvents={setEvents}
        isNewInterview={isNewInterview}
        isTimeslotMode={isTimeslotMode}
        columnOrder={order}
        isManageTimeslots={isManageTimeslots}
        {...cell}
      />
    );
  });

  return (
    <div
      className="row-start-1 grid divide-y divide-x divide-gray-100"
      style={{
        gridTemplateRows: 'repeat(96, minmax(1.5rem, 1fr))',
        gridColumn: `${order} / span 1`,
      }}
    >
      <div ref={containerOffset} className="row-end-1 h-7"></div>
      {timeline}
    </div>
  );
};

export default TimelineWeek;
