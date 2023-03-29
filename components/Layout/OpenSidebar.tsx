import cx from 'classnames';
import Link from 'next/link';
import navigationData from './navigationData';
import NotificationsSlideOver from '@components/Notification/NotificationsSlideOver';

import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { BellIcon } from '@heroicons/react/24/outline';
import { Notification } from '@gql/types/graphql';
import { GET_NOTIFICATIONS } from '@gql/queries/notifications';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Logo } from '@components/LandingPage/Logo';

type Props = {
  pathname: string;
  session: any;
};

const OpenSidebar = ({ pathname, session }: Props) => {
  const { currentUser } = session;
  const [isSlideOverOpen, setIsSlideOverOpen] = useState(false);
  const { data, refetch } = useQuery(GET_NOTIFICATIONS, {
    skip: !currentUser?.candidate?.id,
    variables: {
      where: {
        recipientId: currentUser?.id,
      },
    },
  });

  const unreadNotificationsCount = data?.getNotifications?.filter(
    (notification: any) => !notification.isRead,
  )?.length;

  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col z-10">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div className="mt-2 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {session.currentUser.type === 'CANDIDATE' && (
              <>
                <button
                  type="button"
                  onClick={() => setIsSlideOverOpen(true)}
                  className={cx(
                    'group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    {
                      'bg-gray-100 text-gray-900 !hover:bg-gray-100':
                        isSlideOverOpen,
                    },
                  )}
                >
                  <BellIcon
                    className={cx('mr-3 flex-shrink-0 h-6 w-6', {
                      'text-gray-400 group-hover:text-gray-500':
                        !unreadNotificationsCount,
                      'text-pink-500':
                        unreadNotificationsCount &&
                        unreadNotificationsCount > 0,
                    })}
                  />
                  Notifications
                  {unreadNotificationsCount && unreadNotificationsCount > 0 ? (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-500">
                      {unreadNotificationsCount}
                    </span>
                  ) : null}
                </button>
                <NotificationsSlideOver
                  refetchNotifications={refetch}
                  setIsSlideOverOpen={setIsSlideOverOpen}
                  notifications={data?.getNotifications as Notification[]}
                  open={isSlideOverOpen}
                  setOpen={setIsSlideOverOpen}
                />
              </>
            )}
            <Link href="/" className="flex px-2 mb-2">
              <Logo width={180} />
            </Link>
            {navigationData.map((item) =>
              item.isVisible(currentUser) ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cx(
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                    {
                      'bg-gray-100 text-gray-900':
                        !!item.checkIsActive(pathname),
                      'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
                        !item.checkIsActive(pathname),
                    },
                  )}
                >
                  <item.icon
                    className={cx('mr-3 flex-shrink-0 h-6 w-6', {
                      'text-gray-500': !!item.checkIsActive(pathname),
                      'text-gray-400 group-hover:text-gray-500':
                        !item.checkIsActive(pathname),
                    })}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ) : null,
            )}
          </nav>
        </div>
        <button
          onClick={() => session.logout()}
          className={
            'group flex items-center px-2 mx-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mb-5'
          }
        >
          <ArrowRightOnRectangleIcon
            className={
              'mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
            }
            aria-hidden="true"
          />
          Log out
        </button>
      </div>
    </div>
  );
};

export default OpenSidebar;
