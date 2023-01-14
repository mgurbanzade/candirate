import useNotification from '@hooks/useNotification';
import { useMutation } from '@apollo/client';
import { CREATE_TIMESLOT, DELETE_TIMESLOT } from '@gql/mutations/timeslots';
import { DateTime } from 'luxon';
import { Application } from '@gql/types/graphql';
import { MappedTimeslotType } from '@lib/ui-types';
import { getTimelineForDate } from '../helpers';

import TimelineCell from './TimeslotTimelineCell';

type Props = {
  selectedDay: DateTime;
  application?: Application;
  refetchTimeslots: () => void;
  refetchInterviews: () => void;
  timeslots?: MappedTimeslotType[];
  containerOffset: React.RefObject<HTMLDivElement>;
};

const Timeline = ({
  containerOffset,
  selectedDay,
  refetchTimeslots,
  refetchInterviews,
  application,
  timeslots,
}: Props) => {
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
        refetchTimeslots();
        refetchInterviews();
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
        refetchTimeslots();
        refetchInterviews();
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
    return (
      <TimelineCell
        key={cell.id}
        onClick={
          cell.isFreeTimeslot
            ? () => handleDeleteTimeslot(cell.timeslotId)
            : () => handleCreateTimeslot(cell.hour)
        }
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
