import { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER, REFRESH } from '@gql/queries';
import { User } from '@gql/types/graphql';

type SessionContextType = {
  currentUser: User | null;
};

const SessionContext = createContext<SessionContextType>({
  currentUser: null,
});

const useProvideSession = () => {
  const { data, error } = useQuery(GET_CURRENT_USER);
  const { data: refreshUser } = useQuery(REFRESH, {
    skip: error?.message !== 'Unauthorized',
  });

  return {
    currentUser:
      data?.getCurrentUser?.user || refreshUser?.refresh?.user || null,
  };
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = useProvideSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export default () => useContext(SessionContext);
