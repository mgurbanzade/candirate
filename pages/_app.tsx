import type { AppProps } from 'next/app';
import { AuthProvider } from '@hooks/useAuth';
import Layout from '@components/Layout';
import Notification from '@components/Notification';
import { NotificationProvider } from '@hooks/useNotification';
import { SessionProvider } from '@hooks/useSession';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SessionProvider>
        <NotificationProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Notification />
        </NotificationProvider>
      </SessionProvider>
    </AuthProvider>
  );
}
