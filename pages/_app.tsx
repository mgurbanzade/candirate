import Layout from '@components/Layout';
import Notification from '@components/Notification';
import createApolloClient from '@lib/client';

import { User } from '@gql/types/graphql';
import { REFRESH } from '@gql/queries/auth';
import { useRouter } from 'next/router';
import { loginPath } from '@lib/routes';
import { AuthProvider } from '@hooks/useAuth';
import { ModalProvider } from '@hooks/useModal';
import { SessionContext } from '@hooks/useSession';
import { LOGOUT_MUTATION } from '@gql/mutations/auth';
import { GET_CURRENT_USER } from '@gql/queries/users';
import { AppContext, AppProps } from 'next/app';
import { NotificationProvider } from '@hooks/useNotification';

import '../styles/global.css';

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

        appCtx?.ctx?.res?.setHeader(
          'Set-Cookie',
          `Authentication=${refreshUser.data.refresh.accessToken}; HttpOnly; Path=/; Max-Age=${refreshUser.data.refresh.expSeconds};`,
        );

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

  return {};
};

export default App;
