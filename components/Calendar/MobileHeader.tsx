import { DateTime } from 'luxon';
import cx from 'classnames';
import { forwardRef, ForwardedRef } from 'react';
import { getDaysForWeek } from './helpers';

type Props = {
  selectedDay: DateTime;
  setSelectedDay: (date: DateTime) => void;
  viewType: 'day' | 'week';
  setViewType: (viewType: 'day' | 'week') => void;
};

const MobileHeader = forwardRef(
  (
    { selectedDay, setSelectedDay, viewType }: Props,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const days = getDaysForWeek(selectedDay);
    const daysMarkup = days.map((day) => {
      return (
        <button
          type="button"
          key={day.id}
          onClick={() => setSelectedDay(day.date)}
          className="flex flex-col items-center pt-3 pb-1.5"
        >
          <span
            className={cx({
              'text-red-600': day.isWeekend,
            })}
          >
            {day.date.weekdayShort}
          </span>
          <span
            className={cx(
              'mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900',
              {
                'font-semibold': day.isSelected(selectedDay) || day.isToday,
                'text-indigo-600': day.isToday && !day.isSelected(selectedDay),
                'text-white bg-gray-900':
                  day.isSelected(selectedDay) && !day.isToday,
                'bg-indigo-600 text-white':
                  day.isToday && day.isSelected(selectedDay),
              },
            )}
          >
            {day.date.day}
          </span>
        </button>
      );
    });
    return (
      <div
        ref={ref}
        className={cx(
          'sticky top-0 z-20 grid flex-none grid-cols-7 bg-white text-xs text-gray-500',
          {
            'md:hidden': viewType === 'day',
          },
        )}
        style={{
          zIndex: 60,
          marginLeft: viewType === 'week' ? 'calc(3.5rem + 1.5px)' : '0',
        }}
      >
        {daysMarkup}
      </div>
    );
  },
);

export default MobileHeader;
