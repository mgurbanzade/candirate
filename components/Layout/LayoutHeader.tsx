import Link from 'next/link';
import cx from 'classnames';

import {
  Bars3BottomLeftIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

type Props = {
  setSidebarOpen: (value: boolean) => void;
  session: any;
};

const LayoutHeader = ({ session, setSidebarOpen }: Props) => {
  return (
    <div
      className={cx(
        'sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow justify-between',
        {
          'md:hidden': !!session.currentUser,
        },
      )}
    >
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <span className="sm:hidden md:block" />
      <Link
        href="/login"
        className={cx(
          'flex items-center pr-10 py-2 text-sm font-medium rounded-md min-[100px]:hidden md:flex',
        )}
      >
        <ArrowLeftOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
        Login
      </Link>
    </div>
  );
};

export default LayoutHeader;
