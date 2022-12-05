import Link from 'next/link';
import cx from 'classnames';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import navigationData from './navigationData';

type Props = {
  pathname: string;
  session: any;
};

const OpenSidebar = ({ pathname, session }: Props) => {
  return (
    <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white">
        <div className="mt-2 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navigationData.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cx(
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  {
                    'bg-gray-100 text-gray-900': !!item.checkIsActive(pathname),
                    'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
                      !item.checkIsActive(pathname),
                  },
                )}
              >
                <item.icon
                  className={cx('mr-3 flex-shrink-0 h-6 w-6', {
                    'text-gray-500': !!item.checkIsActive(pathname),
                    'text-gray-400 group-hover:text-gray-500':
                      !item.checkIsActive(pathname),
                  })}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={() => session.logout()}
          className={
            'group flex items-center px-2 mx-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 mb-5'
          }
        >
          <ArrowRightOnRectangleIcon
            className={
              'mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500'
            }
            aria-hidden="true"
          />
          Log out
        </button>
      </div>
    </div>
  );
};

export default OpenSidebar;
