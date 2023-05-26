import cx from 'classnames';
import useSession from '@hooks/useSession';
import { useState } from 'react';
import { useRouter } from 'next/router';
import OpenSidebar from './OpenSidebar';
import HiddenSidebar from './HiddenSidebar';
import LayoutHeader from './LayoutHeader';
import { ToastContainer } from 'react-toastify';

type Props = {
  children: React.ReactNode;
};

const emptyLayoutPaths = [
  '/',
  '/login',
  '/login/reset-password',
  '/signup',
  '/signup/account-verification',
];

export default function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useRouter();
  const session = useSession();

  return (
    <>
      {emptyLayoutPaths.includes(pathname) ? (
        <>{children}</>
      ) : (
        <>
          <HiddenSidebar
            pathname={pathname}
            session={session}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />
          {session.currentUser && (
            <OpenSidebar pathname={pathname} session={session} />
          )}
          <div
            className={cx('flex flex-1 flex-col', {
              'md:pl-64': !!session.currentUser,
            })}
          >
            <LayoutHeader session={session} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1">{children}</main>
          </div>
        </>
      )}
      <ToastContainer theme="colored" />
    </>
  );
}
