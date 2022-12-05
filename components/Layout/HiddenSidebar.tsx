import Link from 'next/link';
import cx from 'classnames';
import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import {
  XMarkIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import navigationData from './navigationData';

type Props = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
  pathname: string;
  session: any;
};

const HiddenSidebar = ({
  pathname,
  session,
  sidebarOpen,
  setSidebarOpen,
}: Props) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 md:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="mt-2 h-0 flex flex-1 flex-overflow-y-auto flex-col justify-between">
                {session?.currentUser ? (
                  <>
                    <nav className="space-y-1 px-2">
                      {navigationData.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cx(
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                            {
                              'bg-gray-100 text-gray-900':
                                !!item.checkIsActive(pathname),
                              'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
                                !item.checkIsActive(pathname),
                            },
                          )}
                        >
                          <item.icon
                            className={cx('mr-4 flex-shrink-0 h-6 w-6', {
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
                  </>
                ) : (
                  <Link
                    href="/login"
                    className={cx(
                      'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      {
                        'bg-gray-100 text-gray-900': pathname === '/login',
                        'text-gray-600 hover:bg-gray-50 hover:text-gray-900':
                          pathname !== '/login',
                      },
                    )}
                  >
                    <ArrowLeftOnRectangleIcon className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" />
                    Login
                  </Link>
                )}
              </div>
            </Dialog.Panel>
          </Transition.Child>
          <div className="w-14 flex-shrink-0" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default HiddenSidebar;
