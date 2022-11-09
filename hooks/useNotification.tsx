import React, { createContext, useState, useContext } from 'react';

export type NotificationType = {
  isVisible: boolean;
  type: 'success' | 'error' | 'info';
  title: string | null;
  description?: string | null;
};

type NotificationContextType = {
  notification: NotificationType;
  setNotification: React.Dispatch<React.SetStateAction<NotificationType>>;
};

type NotificationProviderProps = {
  children: React.ReactNode;
};

const NotificationContext = createContext<NotificationContextType>({
  notification: { isVisible: false, type: 'info', title: null },
  setNotification: () => null,
});

const useNotificationState = () => {
  const [notification, setNotification] = useState<NotificationType>({
    isVisible: false,
    type: 'info',
    title: null,
    description: null,
  });

  return {
    notification,
    setNotification,
  };
};

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const { notification, setNotification } = useNotificationState();

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => useContext(NotificationContext);

export { NotificationProvider };
export default useNotification;
