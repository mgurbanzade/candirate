import { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CURRENT_USER, REFRESH } from '@gql/queries';
import { LOGOUT_MUTATION } from '@gql/mutations';
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
  let currentUser;

  const router = useRouter();
  const { data, error, loading } = useQuery(GET_CURRENT_USER);
  const { data: refreshUser } = useQuery(REFRESH, {
    skip: error?.message !== 'Unauthorized',
  });

  const [logoutAction] = useMutation(LOGOUT_MUTATION);

  if (data?.getCurrentUser?.user || refreshUser?.refresh?.user) {
    currentUser = data?.getCurrentUser?.user || refreshUser?.refresh?.user;
  }

  const logout = async () => {
    const res = await logoutAction();
    if (res.data?.logout.success) {
      currentUser = null;
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
