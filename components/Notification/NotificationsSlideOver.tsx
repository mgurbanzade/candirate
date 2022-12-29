import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Notification } from '@gql/types/graphql';
import NotificationsListItem from './NotificationsListItem';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  notifications: Notification[];
  refetchNotifications: () => void;
  setIsSlideOverOpen: (open: boolean) => void;
};

export default function NotificationsSlideOver({
  open,
  setOpen,
  notifications,
  setIsSlideOverOpen,
  refetchNotifications,
}: Props) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative" onClose={setOpen}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-0"
                enterTo="translate-x-64"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-64"
                leaveTo="translate-x-0"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md w-64">
                  <div className="flex h-full flex-col overflow-y-scroll bg-indigo-50 shadow-xl">
                    <div className="relative flex-1 py-2 px-2">
                      {notifications?.map((notification) => (
                        <NotificationsListItem
                          key={notification.id}
                          setIsSlideOverOpen={setIsSlideOverOpen}
                          refetchNotifications={refetchNotifications}
                          notification={notification}
                        />
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
