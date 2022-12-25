import cx from 'classnames';
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import InterviewCalendarForm from '@components/Interviews/InterviewCalendarForm';
import { UIInteviewType } from '@lib/ui-types';
import { Application } from '@gql/types/graphql';

type Props = {
  event: UIInteviewType;
  setEvents: React.Dispatch<React.SetStateAction<UIInteviewType[]>>;
  refetchEvents: () => void;
};

const NewEvent = ({ event, setEvents, refetchEvents }: Props) => {
  const topOffset = 2;
  const startHour = event.startDate.hour + event.startDate.minute / 60;
  const gridRow = `${startHour * 12 + topOffset} / span ${event.duration * 12}`;

  return (
    <Popover
      className="relative mt-px flex cursor-pointer z-50"
      style={{ gridRow }}
    >
      {({ open, close }) => (
        <>
          <li>
            <Popover.Button
              data-headlessui-state="open"
              className={cx(
                'group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-gray-900',
                {
                  'text-gray-900': open,
                  'text-gray-500': !open,
                },
              )}
            >
              <a className="group absolute inset-1 flex flex-col items-start overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-2 hover:bg-blue-100">
                <p className="order-1 font-semibold text-blue-700">
                  {event.title}
                </p>
                <p className="order-1 text-blue-500 group-hover:text-blue-700">
                  {event.description}
                </p>
                <p className="text-blue-500 group-hover:text-blue-700">
                  <time dateTime={event.startDate.toISO()}>
                    {event.startStr}
                  </time>
                </p>
              </a>
            </Popover.Button>
          </li>

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
            <Popover.Panel className="absolute left-44 z-10 mt-3 w-screen max-w-xs -translate-x-1/2 transform px-2 sm:px-0 mt-16 -ml-2">
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
