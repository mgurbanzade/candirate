import { createContext, useContext } from 'react';
import { User } from '@gql/types/graphql';

type SessionContextType = {
  currentUser: User | null | undefined;
  logout: () => void;
};

export const SessionContext = createContext<SessionContextType>({
  currentUser: null,
  logout: () => null,
});

export default () => useContext(SessionContext);
