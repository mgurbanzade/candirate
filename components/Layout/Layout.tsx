import Link from 'next/link';
import cx from 'classnames';
import useSession from '@hooks/useSession';
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';

import {
  Bars3BottomLeftIcon,
  BriefcaseIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Profile',
    href: '/profile',
    icon: UserCircleIcon,
    checkIsActive: (pathname: string) => pathname === '/profile',
  },
  {
    name: 'Positions',
    href: '/positions',
    icon: BriefcaseIcon,
    checkIsActive: (pathname: string) => pathname === '/positions',
  },
  {
    name: 'Questions',
    href: '/questions',
    icon: QuestionMarkCircleIcon,
    checkIsActive: (pathname: string) => pathname === '/questions',
  },
  {
    name: 'Interviews',
    href: '/interviews',
    icon: CalendarDaysIcon,
    checkIsActive: (pathname: string) => pathname === '/interviews',
  },
];

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useRouter();
  const session = useSession();
  return (
    <div>
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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
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
                <div className="mt-5 h-0 flex-1 overflow-y-auto">
                  {session?.currentUser ? (
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
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
      {session.currentUser && (
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cx(
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                      {
                        'bg-gray-100 text-gray-900':
                          !!item.checkIsActive(pathname),
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
      )}
      <div
        className={cx('flex flex-1 flex-col', {
          'md:pl-64': !!session.currentUser,
        })}
      >
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow justify-between">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <span className="sm:hidden md:block" />
          {!session.currentUser && (
            <Link
              href="/login"
              className="group flex items-center px-2 mr-5 py-2 text-base font-medium rounded-md sm:hidden md:flex"
            >
              Login
            </Link>
          )}
        </div>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
