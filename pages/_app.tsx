import Layout from '@components/Layout';
import Notification from '@components/Notification';
import createApolloClient from '@lib/client';
import { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AuthProvider } from '@hooks/useAuth';
import { NotificationProvider } from '@hooks/useNotification';
import { SessionContext } from '@hooks/useSession';
import { ModalProvider } from '@hooks/useModal';
import { GET_CURRENT_USER } from '@gql/queries/users';
import { REFRESH } from '@gql/queries/auth';
import { LOGOUT_MUTATION } from '@gql/mutations/auth';
import { User } from '@gql/types/graphql';

import '../styles/global.css';
import { loginPath } from '@lib/routes';

function App({
  Component,
  pageProps,
  currentUser,
  headers,
}: AppProps & { currentUser: User; headers: any }) {
  const client = createApolloClient();
  const router = useRouter();

  const logout = async () => {
    const res = await client.mutate({
      context: {
        headers,
      },
      mutation: LOGOUT_MUTATION,
    });

    if (res.data?.logout.success) {
      router.push(loginPath());
    }
  };
  return (
    <AuthProvider>
      <SessionContext.Provider
        value={{
          currentUser,
          logout,
        }}
      >
        <NotificationProvider>
          <ModalProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
          <Notification />
        </NotificationProvider>
      </SessionContext.Provider>
    </AuthProvider>
  );
}

App.getInitialProps = async (appCtx: AppContext) => {
  const client = createApolloClient();
  try {
    const currUser = await client.query({
      context: {
        headers: appCtx?.ctx?.req?.headers,
      },
      query: GET_CURRENT_USER,
    });

    return {
      currentUser: currUser.data.getCurrentUser.user,
      headers: appCtx?.ctx?.req?.headers,
    };
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      try {
        const refreshUser = await client.query({
          context: {
            headers: appCtx?.ctx?.req?.headers,
          },
          query: REFRESH,
        });

        return {
          currentUser: refreshUser.data.refresh.user,
          headers: appCtx?.ctx?.req?.headers,
        };
      } catch (e) {
        return {
          currentUser: null,
          headers: appCtx?.ctx?.req?.headers,
        };
      }
    }
  }
};

export default App;
