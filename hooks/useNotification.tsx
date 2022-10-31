import React, { createContext, useState, useContext } from 'react';

type Notificationtype = {
  isVisible: boolean;
  type: 'success' | 'error' | 'info';
  title: string | null;
  description?: string | null;
};

type NotificationContextType = {
  notification: Notificationtype;
  setNotification: React.Dispatch<React.SetStateAction<Notificationtype>>;
};

type NotificationProviderProps = {
  children: React.ReactNode;
};

const NotificationContext = createContext<NotificationContextType>({
  notification: { isVisible: false, type: 'info', title: null },
  setNotification: () => null,
});

const useNotificationState = () => {
  const [notification, setNotification] = useState<Notificationtype>({
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
