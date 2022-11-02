import type { AppProps } from 'next/app';
import { AuthProvider } from '@hooks/useAuth';
import Layout from '@components/Layout';
import Notification from '@components/Notification';
import { NotificationProvider } from '@hooks/useNotification';
import '../styles/global.css';
import { SessionProvider } from '@hooks/useSession';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AuthProvider>
        <SessionProvider>
          <NotificationProvider>
            <Component {...pageProps} />
            <Notification />
          </NotificationProvider>
        </SessionProvider>
      </AuthProvider>
    </Layout>
  );
}
