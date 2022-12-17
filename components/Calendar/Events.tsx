import Link from 'next/link';
import NewEvent from './NewEvent';

import { UIInteviewType } from '@lib/ui-types';
import { interviewPath } from '@lib/routes';

type Props = {
  events: UIInteviewType[];
  setEvents: React.Dispatch<React.SetStateAction<UIInteviewType[]>>;
  refetchEvents: () => void;
};

const Events = ({ events, setEvents, refetchEvents }: Props) => {
  const eventItems = events.map((event) => {
    const topOffset = 2;
    const minutesOffset = event.startDate.minute / 60;
    const hourOffset = (event.startDate.hour + minutesOffset) * 12;
    const gridRow = `${hourOffset + topOffset} / span ${event.duration * 12}`;

    if (event.isNew)
      return (
        <NewEvent
          key={event.id}
          event={event}
          setEvents={setEvents}
          refetchEvents={refetchEvents}
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
          className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-2 hover:bg-blue-100"
        >
          <p className="text-blue-500 group-hover:text-blue-700">
            <time dateTime={event.startDate.toISO()}>{event.startStr}</time>
          </p>
          <p className="font-semibold text-blue-700">{event.title}</p>
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
    <ol
      className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
      style={{
        gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
      }}
    >
      {eventItems}
    </ol>
  );
};

export default Events;
