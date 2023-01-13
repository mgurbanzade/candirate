import cx from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { Resizable } from 're-resizable';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { UITimelineEventType } from '@lib/ui-types';

type Props = {
  slot: UITimelineEventType;
  events: UITimelineEventType[];
  setEvents: React.Dispatch<React.SetStateAction<UITimelineEventType[]>>;
};

const CELL_HEIGHT_PX = 24;

const NewTimeslot = ({ slot, events, setEvents }: Props) => {
  const [size, setSize] = useState({ width: 100, height: CELL_HEIGHT_PX });
  const [duration, setDuration] = useState(slot.duration);

  const topOffset = 2;
  const startHour = slot.startDate.hour + slot.startDate.minute / 60;
  const gridRow = `${startHour * 12 + topOffset} / span ${slot.duration * 12}`;
  const endDate = slot.startDate.plus({ hour: duration });
  const startDateStr = slot.startDate.toFormat('h:mma');
  const endDateStr = endDate.toFormat('h:mma');

  const handleResizeStop = useCallback(
    (_e: any, _direction: any, _ref: any, d: any) => {
      const nextEvent = [...events]
        .sort((a, b) => (a.startDate > b.startDate ? 1 : -1))
        .find((e) => e.startDate > slot.startDate);
      const durationUnits = (Math.abs(d.height) / CELL_HEIGHT_PX) * 0.25;
      const newDuration =
        d.height < 0 ? duration - durationUnits : duration + durationUnits;
      const newEndDate = slot.startDate.plus({ hour: newDuration });

      if (nextEvent && newEndDate > nextEvent.startDate) {
        const diffMinCells =
          nextEvent?.startDate.diff(slot.startDate, 'minutes').minutes / 15;
        const updatedDuration = nextEvent?.startDate.diff(
          slot.startDate,
          'hours',
        ).hours;

        setDuration(updatedDuration);
        setSize({
          ...size,
          height: diffMinCells * CELL_HEIGHT_PX,
        });
      } else if (
        newEndDate > slot.startDate.plus({ hour: 24 }).startOf('day')
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
      ...slot,
      duration,
      endDate: slot.startDate.plus({ hour: duration }),
    };

    setEvents((prev) => {
      const updatedEvents = prev.map((e) => {
        if (e.id === slot.id) {
          return updatedEvent;
        }
        return e;
      });

      return updatedEvents;
    });
  }, [duration]);

  return (
    <li className="relative mt-px flex cursor-pointer z-50" style={{ gridRow }}>
      <div className="group flex h-content rounded-md text-base font-medium hover:text-gray-900">
        <button
          type="button"
          onClick={() => {
            setEvents((prev) => prev.filter((e) => e.id !== slot.id));
          }}
          className={cx('w-4 h-4 absolute top-1 right-2 text-lime-800 z-50', {
            'pt-0': duration <= 0.25,
            'pt-0.5': duration > 0.25,
          })}
        >
          <XMarkIcon />
        </button>
        <Resizable
          minHeight={CELL_HEIGHT_PX}
          grid={[CELL_HEIGHT_PX, CELL_HEIGHT_PX]}
          className="flex !absolute top-0 left-0 !w-full p-1"
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
          <div
            className={cx(
              'w-full h-full text-[12px] leading-[16px] flex justify-center overflow-y-auto rounded-lg bg-lime-50 hover:bg-lime-100 text-xs z-10',
            )}
          >
            <p className="flex justify-center items-center font-semibold text-lime-700">
              {duration > 0.25 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mr-1 text-lime-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
              Free time slot from {startDateStr} to {endDateStr}
            </p>
          </div>
        </Resizable>
      </div>
    </li>
  );
};

export default NewTimeslot;
