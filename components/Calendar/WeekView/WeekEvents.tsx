import cx from 'classnames';
import Link from 'next/link';
import NewEvent from '../NewEvent';
import NewTimeslot from '../NewTimeslot';

import { TimelineEventTypes, UITimelineEventType } from '@lib/ui-types';
import { interviewPath } from '@lib/routes';

type Props = {
  events: UITimelineEventType[];
  setEvents: React.Dispatch<React.SetStateAction<UITimelineEventType[]>>;
  refetchEvents: () => void;
};

const WeekEvents = ({ events, setEvents, refetchEvents }: Props) => {
  const wrappers = [1, 2, 3, 4, 5, 6, 7].map((order) => {
    const eventItems = events
      .filter((event) => event.startDate.weekday === order)
      .map((event) => {
        const topOffset = 2;
        const minutesOffset = event.startDate.minute / 60;
        const hourOffset = (event.startDate.hour + minutesOffset) * 12;
        const gridRow = `${hourOffset + topOffset} / span ${
          event.duration * 12
        }`;

        if (event.type === TimelineEventTypes.EVENT)
          return (
            <NewEvent
              key={event.id}
              event={event}
              events={events}
              setEvents={setEvents}
              refetchEvents={refetchEvents}
              viewType="week"
            />
          );

        if (event.type === TimelineEventTypes.NEW_SLOT)
          return (
            <NewTimeslot
              key={event.id}
              slot={event}
              events={events}
              setEvents={setEvents}
              viewType="week"
            />
          );

        return (
          <li
            key={event.id}
            className="relative mt-px flex z-10"
            style={{ gridRow }}
          >
            <Link
              href={interviewPath(event.uuid as string)}
              className={cx(
                'group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 text-xs leading-2 hover:bg-blue-100',
                {
                  'p-2': event.duration > 0.5,
                  'pl-2 justify-center': event.duration === 0.5,
                },
              )}
              style={{
                marginLeft: '3px',
              }}
            >
              <p
                className={cx('text-blue-500 group-hover:text-blue-700', {
                  'pl-2': event.duration <= 0.25,
                })}
              >
                <time
                  dateTime={event.startDate.toISO()}
                  className="font-semibold text-blue-700"
                >
                  {event.startStr} - {event.endStr}
                </time>
                {event.duration <= 0.25 && (
                  <span className="ml-2 inline-flex font-semibold text-blue-700">
                    {event.title}
                  </span>
                )}
              </p>
              {event.duration > 0.25 && (
                <p className="font-semibold mt-2 text-blue-700">
                  {event.title}
                </p>
              )}
              {event.duration > 0.5 && (
                <p className="text-blue-500 group-hover:text-blue-700">
                  {event.description}
                </p>
              )}
            </Link>
          </li>
        );
      });

    return (
      <div
        key={order}
        className={`col-start-${order} col-end-${
          order + 1
        } row-start-1 grid grid-cols-1`}
        style={{
          gridTemplateRows: '1.75rem repeat(288, minmax(0px, 1fr)) auto',
        }}
      >
        {eventItems}
      </div>
    );
  });

  return <>{wrappers}</>;
};

export default WeekEvents;
