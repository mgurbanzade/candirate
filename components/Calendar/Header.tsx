import { Fragment } from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import { DateTime } from 'luxon';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type Props = {
  selectedDay: DateTime;
  isManageTimeslots?: boolean;
  setSelectedDay: (date: DateTime) => void;
  viewType: 'day' | 'week';
  setViewType: (viewType: 'day' | 'week') => void;
};

const CalendarHeader = ({
  selectedDay,
  setSelectedDay,
  viewType,
  setViewType,
}: Props) => {
  const dateTimeIso = selectedDay.toISO();
  const isWeekView = viewType === 'week';
  const isDayView = viewType === 'day';

  return (
    <header className="flex flex-none items-center justify-between border-b border-gray-200 py-4 px-6 bg-white sm:rounded-t-md">
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg font-semibold leading-6 text-gray-900">
            <time dateTime={dateTimeIso} className="sm:hidden">
              {selectedDay.toFormat('MMM d, y')}
            </time>
            <time dateTime={dateTimeIso} className="hidden sm:inline">
              {selectedDay.toFormat('MMMM d, y')}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {selectedDay.weekdayLong}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center rounded-md shadow-sm md:items-stretch">
          <button
            type="button"
            onClick={() => {
              const gap = isDayView
                ? { days: 1 }
                : isWeekView || window.innerWidth < 768
                ? { weeks: 1 }
                : { months: 1 };
              setSelectedDay(selectedDay.minus(gap));
            }}
            className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Previous month</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setSelectedDay(DateTime.local())}
            className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
          >
            Today
          </button>
          <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
          <button
            type="button"
            onClick={() => {
              const gap = isDayView
                ? { days: 1 }
                : isWeekView || window.innerWidth < 768
                ? { weeks: 1 }
                : { months: 1 };
              setSelectedDay(selectedDay.plus(gap));
            }}
            className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
          >
            <span className="sr-only">Next month</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden md:ml-4 md:flex md:items-center">
          <Menu as="div" className="relative">
            <Menu.Button
              type="button"
              className="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              {viewType === 'day' ? 'Day view' : 'Week view'}
              <ChevronDownIcon
                className="ml-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                style={{ zIndex: 60 }}
                className="absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => setViewType('day')}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left',
                        )}
                      >
                        Day view
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => setViewType('week')}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block px-4 py-2 text-sm w-full text-left',
                        )}
                      >
                        Week view
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default CalendarHeader;
