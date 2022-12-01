import type { AppProps } from 'next/app';
import { AuthProvider } from '@hooks/useAuth';
import Layout from '@components/Layout';
import Notification from '@components/Notification';
import { NotificationProvider } from '@hooks/useNotification';
import { SessionProvider } from '@hooks/useSession';
import { ModalProvider } from '@hooks/useModal';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <SessionProvider>
        <NotificationProvider>
          <ModalProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
          <Notification />
        </NotificationProvider>
      </SessionProvider>
    </AuthProvider>
  );
}
