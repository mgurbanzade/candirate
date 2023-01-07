import { Fragment } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Resizable } from 're-resizable';
import { Application } from '@gql/types/graphql';
import { Popover, Transition } from '@headlessui/react';
import { useCallback, useEffect, useState } from 'react';
import { UITimelineEventType } from '@lib/ui-types';

import cx from 'classnames';
import InterviewCalendarForm from '@components/Interviews/InterviewCalendarForm';

type Props = {
  event: UITimelineEventType;
  events: UITimelineEventType[];
  setEvents: React.Dispatch<React.SetStateAction<UITimelineEventType[]>>;
  refetchEvents: () => void;
};

const CELL_HEIGHT_PX = 24;

const NewEvent = ({ event, events, setEvents, refetchEvents }: Props) => {
  const [size, setSize] = useState({ width: 100, height: CELL_HEIGHT_PX });
  const [duration, setDuration] = useState(event.duration);

  const topOffset = 2;
  const startHour = event.startDate.hour + event.startDate.minute / 60;
  const gridRow = `${startHour * 12 + topOffset} / span ${event.duration * 12}`;
  const endDate = event.startDate.plus({ hour: duration });
  const startDateStr = event.startDate.toFormat('h:mma');
  const endDateStr = endDate.toFormat('h:mma');

  const handleResizeStop = useCallback(
    (_e: any, _direction: any, _ref: any, d: any) => {
      const nextEvent = [...events]
        .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
        .find((e) => e.startDate > event.startDate);

      const durationUnits = (Math.abs(d.height) / CELL_HEIGHT_PX) * 0.25;
      const newDuration =
        d.height < 0 ? duration - durationUnits : duration + durationUnits;
      const newEndDate = event.startDate.plus({ hour: newDuration });

      if (nextEvent && newEndDate > nextEvent.startDate) {
        const diffMinCells =
          nextEvent?.startDate.diff(event.startDate, 'minutes').minutes / 15;
        const updatedDuration = nextEvent?.startDate.diff(
          event.startDate,
          'hours',
        ).hours;

        setDuration(updatedDuration);
        setSize({
          ...size,
          height: diffMinCells * CELL_HEIGHT_PX,
        });
      } else if (
        newEndDate > event.startDate.plus({ hour: 24 }).startOf('day')
      ) {
        return;
      } else {
        setDuration(newDuration);
        setSize({
          ...size,
          height: size.height + d.height,
        });
      }
    },
    [size.height, duration, events.length],
  );

  useEffect(() => {
    const updatedEvent = {
      ...event,
      duration,
      endDate: event.startDate.plus({ hour: duration }),
    };

    setEvents((prev) => {
      const updatedEvents = prev.map((e) => {
        if (e.id === event.id) {
          return updatedEvent;
        }
        return e;
      });

      return updatedEvents;
    });
  }, [duration]);

  return (
    <Popover className="relative mt-px flex cursor-pointer" style={{ gridRow }}>
      {({ open, close }) => (
        <>
          <Resizable
            minHeight={CELL_HEIGHT_PX}
            grid={[CELL_HEIGHT_PX, CELL_HEIGHT_PX]}
            className="flex !absolute top-0 left-0 !w-full"
            size={size}
            handleStyles={{
              bottom: {
                zIndex: 100,
                height: '10px',
                bottom: '-5px',
              },
            }}
            handleClasses={{
              top: 'pointer-events-none',
              right: 'pointer-events-none',
              left: 'pointer-events-none',
              topRight: 'pointer-events-none',
              bottomRight: 'pointer-events-none',
              bottomLeft: 'pointer-events-none',
              topLeft: 'pointer-events-none',
            }}
            onResizeStop={handleResizeStop}
          >
            <Popover.Button
              data-headlessui-state="open"
              className={cx(
                'w-full h-full group inline-flex items-center rounded-md text-base font-mediump-1 p-1 outline-none',
                {
                  'text-gray-900': open,
                  'text-gray-500': !open,
                },
              )}
            >
              <div
                className={cx(
                  'w-full h-full text-[12px] leading-[16px] flex justify-center items-center overflow-y-auto rounded-lg bg-blue-50 hover:bg-blue-100 text-xs z-10 p-1',
                )}
              >
                <p className="font-semibold text-blue-700">
                  <time dateTime={event.startDate.toISO()} className="mr-2">
                    {startDateStr} - {endDateStr}
                  </time>
                  {event.title}
                </p>
                <p className="text-blue-500 group-hover:text-blue-700">
                  {event.description}
                </p>
              </div>
            </Popover.Button>
          </Resizable>

          <Transition
            as={Fragment}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="absolute left-44 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0 mt-5 -ml-2"
              style={{ zIndex: 1000 }}
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative grid gap-6 bg-white px-4 py-4 sm:gap-8">
                  <InterviewCalendarForm
                    application={event.application as Application}
                    setEvents={setEvents}
                    event={event}
                    closePopover={close}
                    refetchEvents={refetchEvents}
                  />
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default NewEvent;
