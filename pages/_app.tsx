import type { AppProps } from 'next/app';
import { AuthProvider } from '@hooks/useAuth';
import Layout from '@components/Layout';
import Notification from '@components/Notification';
import { NotificationProvider } from '@hooks/useNotification';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AuthProvider>
        <NotificationProvider>
          <Component {...pageProps} />
          <Notification />
        </NotificationProvider>
      </AuthProvider>
    </Layout>
  );
}
