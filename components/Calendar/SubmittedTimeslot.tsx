import cx from 'classnames';
import { Fragment } from 'react';
import InterviewCalendarForm from '@components/Interviews/InterviewCalendarForm';
import { Popover, Transition } from '@headlessui/react';
import { UITimelineEventType, TimelineEventTypes } from '@lib/ui-types';
import { Application } from '@gql/types/graphql';

type Props = {
  event: UITimelineEventType;
  // events: UITimelineEventType[];
  setEvents: React.Dispatch<React.SetStateAction<UITimelineEventType[]>>;
  refetchEvents: () => void;
};

const SubmittedTimeslot = ({ event, setEvents, refetchEvents }: Props) => {
  const topOffset = 2;
  const startHour = event.startDate.hour + event.startDate.minute / 60;
  const gridRow = `${startHour * 12 + topOffset} / span ${event.duration * 12}`;

  return (
    <Popover className="relative mt-px flex cursor-pointer" style={{ gridRow }}>
      {({ open, close }) => (
        <>
          <Popover.Button
            data-headlessui-state="open"
            className={cx(
              'w-full h-full group inline-flex items-center rounded-md text-base font-medium hover:text-gray-900 p-1',
              {
                'text-gray-900': open,
                'text-gray-500': !open,
              },
            )}
          >
            <div
              className={cx(
                'w-full h-full text-[12px] leading-[16px] flex justify-center overflow-y-auto rounded-lg bg-lime-50 hover:bg-lime-100 text-xs z-10',
              )}
            >
              <p className="flex justify-center items-center order-1 font-semibold text-lime-700">
                {event.duration > 0.25 && (
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
                {event.title}
              </p>
            </div>
          </Popover.Button>

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

export default SubmittedTimeslot;
