import { createContext, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER } from '@gql/queries/users';
import { REFRESH } from '@gql/queries/auth';
import { LOGOUT_MUTATION } from '@gql/mutations/auth';
import { User } from '@gql/types/graphql';

type SessionContextType = {
  currentUser: User | null | undefined;
  loading: boolean;
  logout: () => void;
};

const SessionContext = createContext<SessionContextType>({
  currentUser: null,
  loading: false,
  logout: () => null,
});

const useProvideSession = () => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(null);
  const router = useRouter();
  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    skip: !!currentUser,
  });
  const { data: refreshUser } = useQuery(REFRESH, {
    skip: error?.message !== 'Unauthorized' || !!currentUser,
  });

  const [logoutAction] = useMutation(LOGOUT_MUTATION);

  if (data?.getCurrentUser?.user || refreshUser?.refresh?.user) {
    setCurrentUser(data?.getCurrentUser?.user || refreshUser?.refresh?.user);
  }

  const logout = async () => {
    const res = await logoutAction();
    if (res.data?.logout.success) {
      setCurrentUser(null);
      router.push('/');
    }
  };

  return {
    loading,
    logout,
    currentUser,
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
