import {
  BriefcaseIcon,
  QuestionMarkCircleIcon,
  CalendarDaysIcon,
  UserCircleIcon,
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

export default navigation;
