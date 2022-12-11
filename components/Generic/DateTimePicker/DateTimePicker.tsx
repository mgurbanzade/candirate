import cx from 'classnames';
import { Fragment, useState, useCallback } from 'react';
import { DateTime } from 'luxon';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { Popover, Transition } from '@headlessui/react';
import Select from '@components/Generic/Select';
import { getDatePickerData, getTimeStampsForDay } from './helpers';

type Props = {
  selectedDay: DateTime;
  setSelectedDay: (date: DateTime) => void;
  control?: any;
};

const DateTimePicker = ({ selectedDay, setSelectedDay, control }: Props) => {
  const [open, setOpen] = useState(false);
  const days = getDatePickerData(selectedDay);
  const timeStamps = getTimeStampsForDay(selectedDay);
  const timestampOptions = timeStamps.map((timeStamp) => ({
    id: timeStamp.id,
    name: timeStamp.date.toFormat('hh:mm a'),
  }));

  const DateTimeInput = useCallback(
    () => (
      <input
        type="text"
        name="date"
        id="date"
        onFocusCapture={() => setOpen(true)}
        onBlurCapture={() => setOpen(false)}
        value={selectedDay.toFormat('d MMMM yyyy')}
        className="block rounded-md border border-gray-300 sm:text-sm w-40 mr-1"
        readOnly
      />
    ),
    [selectedDay],
  );

  return (
    <>
      <Popover className="relative mt-px flex sm:text-sm w-80 justify-between">
        <>
          {control && (
            <Select
              fieldName="time"
              options={timestampOptions}
              control={control}
              defaultSelected={timestampOptions.find(
                (t) => t.id === selectedDay.toISO(),
              )}
              wrapperClassnames="w-full shadow-none"
            />
          )}
          <Popover.Button
            data-headlessui-state="open"
            as={DateTimeInput as any}
          />

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
              className="absolute left-44 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0 mt-12 -ml-4"
              static
            >
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-white">
                  <div className="hidden max-w-md flex-none border-l border-gray-100 md:block">
                    <div className="flex items-center text-center text-gray-900 px-4 py-4">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDay(selectedDay.minus({ months: 1 }))
                        }
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Previous month</span>
                        <ChevronLeftIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <div className="flex-auto font-semibold">
                        {selectedDay.monthLong} {selectedDay.year}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedDay(selectedDay.plus({ months: 1 }))
                        }
                        className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Next month</span>
                        <ChevronRightIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="mt-2 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div key={i + day}>{day}</div>
                      ))}
                    </div>
                    <div className="isolate mt-2 grid grid-cols-7 gap-px bg-gray-200 text-sm shadow ring-1 ring-gray-200">
                      {days.map((day, dayIdx) => {
                        const isSelected = day.isSelected(selectedDay);
                        return (
                          <button
                            key={day.id}
                            type="button"
                            onClick={() => setSelectedDay(day.date)}
                            className={cx(
                              'py-1.5 hover:bg-gray-100 focus:z-10',
                              {
                                'bg-white': day.isCurrentMonth,
                                'bg-gray-50': !day.isCurrentMonth,
                                'bg-red-50 hover:bg-red-50': day.isWeekend,
                                'font-semibold': isSelected || day.isToday,
                                'text-indigo-600': day.isToday && !isSelected,
                                'text-white': isSelected,
                                'text-gray-900':
                                  !isSelected &&
                                  day.isCurrentMonth &&
                                  !day.isToday,
                                'text-gray-400':
                                  !isSelected &&
                                  !day.isCurrentMonth &&
                                  !day.isToday,
                                'rounded-bl-lg': dayIdx === days.length - 7,
                                'rounded-br-lg': dayIdx === days.length - 1,
                              },
                            )}
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
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </>
  );
};

export default DateTimePicker;
