import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { DateTime } from 'luxon';
import cx from 'classnames';
import { getDatePickerData } from './helpers';

type Props = {
  selectedDay: DateTime;
  setSelectedDay: (date: DateTime) => void;
};

const Datepicker = ({ selectedDay, setSelectedDay }: Props) => {
  const days = getDatePickerData(selectedDay);
  return (
    <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 py-10 px-8 md:block">
      <div className="flex items-center text-center text-gray-900">
        <button
          type="button"
          onClick={() => setSelectedDay(selectedDay.minus({ months: 1 }))}
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto font-semibold">
          {selectedDay.monthLong} {selectedDay.year}
        </div>
        <button
          type="button"
          onClick={() => setSelectedDay(selectedDay.plus({ months: 1 }))}
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
          <div key={i + day}>{day}</div>
        ))}
      </div>
      <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
        {days.map((day, dayIdx) => {
          const isSelected = day.isSelected(selectedDay);
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => setSelectedDay(day.date)}
              className={cx('py-1.5 hover:bg-gray-100 focus:z-10', {
                'bg-white': day.isCurrentMonth,
                'bg-gray-50': !day.isCurrentMonth,
                'bg-red-50 hover:bg-red-50': day.isWeekend,
                'font-semibold': isSelected || day.isToday,
                'text-indigo-600': day.isToday && !isSelected,
                'text-white': isSelected,
                'text-gray-900':
                  !isSelected && day.isCurrentMonth && !day.isToday,
                'text-gray-400':
                  !isSelected && !day.isCurrentMonth && !day.isToday,
                'rounded-tl-lg': dayIdx === 0,
                'rounded-tr-lg': dayIdx === 6,
                'rounded-bl-lg': dayIdx === days.length - 7,
                'rounded-br-lg': dayIdx === days.length - 1,
              })}
            >
              <time
                dateTime={day.date.toISO()}
                className={cx(
                  'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                  {
                    'bg-indigo-600': day.isToday && isSelected,
                    'bg-gray-900': isSelected && !day.isToday,
                  },
                )}
              >
                {day.date.day}
              </time>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Datepicker;
