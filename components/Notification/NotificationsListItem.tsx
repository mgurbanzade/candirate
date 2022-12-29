import cx from 'classnames';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { positionPath } from 'lib/routes';
import { Notification } from '@gql/types/graphql';
import { SET_NOTIFICATION_READ } from '@gql/mutations/notifications';

type Props = {
  refetchNotifications: () => void;
  notification: Notification;
  setIsSlideOverOpen: (value: boolean) => void;
};

const NotificationsListItem = ({
  notification,
  refetchNotifications,
  setIsSlideOverOpen,
}: Props) => {
  const router = useRouter();
  const [setNotificationRead] = useMutation(SET_NOTIFICATION_READ);
  const handleRedirect = async () => {
    try {
      const res = await setNotificationRead({
        variables: {
          id: notification.id as number,
        },
      });

      if (res.data?.setNotificationRead.isRead) {
        refetchNotifications();
        setIsSlideOverOpen(false);
        router.push(positionPath(notification?.positionUuid as string));
      }
    } catch (error) {
      console.log(error);
      setIsSlideOverOpen(false);
      router.push(positionPath(notification?.positionUuid as string));
    }
  };
  return (
    <div
      onClick={handleRedirect}
      className={cx(
        'flex items-center py-2 p-2 rounded-lg mb-2 cursor-pointer',
        {
          'bg-lime-50': !notification.isRead,
          'bg-gray-50': notification.isRead,
        },
      )}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-900 mb-1">
          {notification.title}
        </p>
        <p className="text-sm text-gray-500">{notification.body}</p>
      </div>
    </div>
  );
};

export default NotificationsListItem;
