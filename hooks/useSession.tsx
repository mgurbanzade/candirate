import { createContext, useContext } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '@gql/queries';
import { User } from '@gql/types/graphql';

type SessionContextType = {
  currentUser: User | null;
};

const SessionContext = createContext<SessionContextType>({
  currentUser: null,
});

const useProvideSession = () => {
  const { data } = useQuery(GET_CURRENT_USER);
  return { currentUser: data?.getCurrentUser.user || null };
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
