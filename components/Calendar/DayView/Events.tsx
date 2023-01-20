import cx from 'classnames';
import Link from 'next/link';
import NewEvent from '../NewEvent';
import NewTimeslot from '../NewTimeslot';

import { TimelineEventTypes, UITimelineEventType } from '@lib/ui-types';
import { interviewPath } from '@lib/routes';
import { DateTime } from 'luxon';

type Props = {
  events: UITimelineEventType[];
  setEvents: React.Dispatch<React.SetStateAction<UITimelineEventType[]>>;
  refetchEvents: () => void;
};

const Events = ({ events, setEvents, refetchEvents }: Props) => {
  const eventItems = events.map((event) => {
    const topOffset = 2;
    const minutesOffset = event.startDate.minute / 60;
    const hourOffset = (event.startDate.hour + minutesOffset) * 12;
    const gridRow = `${hourOffset + topOffset} / span ${event.duration * 12}`;

    if (event.type === TimelineEventTypes.EVENT)
      return (
        <NewEvent
          key={event.id}
          event={event}
          events={events}
          setEvents={setEvents}
          refetchEvents={refetchEvents}
          viewType="day"
        />
      );

    if (event.type === TimelineEventTypes.NEW_SLOT)
      return (
        <NewTimeslot
          key={event.id}
          slot={event}
          events={events}
          setEvents={setEvents}
          viewType="day"
        />
      );

    const isExpired = event.startDate < DateTime.local();

    return (
      <li
        key={event.id}
        className="relative mt-px flex z-10"
        style={{ gridRow }}
      >
        <Link
          href={interviewPath(event.uuid as string)}
          className={cx(
            'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg text-xs leading-2',
            {
              'p-2': event.duration > 0.5,
              'bg-blue-50 hover:bg-blue-100': !isExpired,
              'bg-red-50 hover:bg-red-100': isExpired,
              'pl-2 justify-center': event.duration === 0.5,
            },
          )}
        >
          <p
            className={cx({
              'pl-2': event.duration <= 0.25,
              'text-blue-500 group-hover:text-blue-700': !isExpired,
              'text-red-500 group-hover:text-red-700': isExpired,
            })}
          >
            <time
              dateTime={event.startDate.toISO()}
              className={cx('font-semibold', {
                'text-blue-700': !isExpired,
                'text-red-700': isExpired,
              })}
            >
              {event.startStr} - {event.endStr}
            </time>
            {event.duration <= 0.25 && (
              <span
                className={cx('ml-2 inline-flex font-semibold', {
                  'text-red-700': isExpired,
                  'text-blue-700': !isExpired,
                })}
              >
                {event.title}
              </span>
            )}
          </p>
          {event.duration > 0.25 && (
            <p
              className={cx('font-semibold', {
                'text-red-700': isExpired,
                'text-blue-700': !isExpired,
              })}
            >
              {event.title}
            </p>
          )}
          {event.duration > 0.5 && (
            <p
              className={cx({
                'text-red-500 group-hover:text-red-700': isExpired,
                'text-blue-500 group-hover:text-blue-700': !isExpired,
              })}
            >
              {event.description}
            </p>
          )}
        </Link>
      </li>
    );
  });

  return (
    <div
      className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
      style={{
        gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
      }}
    >
      {eventItems}
    </div>
  );
};

export default Events;
