import { User } from '@gql/types/graphql';
import {
  BriefcaseIcon,
  QuestionMarkCircleIcon,
  CalendarDaysIcon,
  UserCircleIcon,
  ServerStackIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  {
    name: 'Profile',
    href: '/profile',
    icon: UserCircleIcon,
    isVisible: (user?: User) => true,
    checkIsActive: (pathname: string) => pathname === '/profile',
  },
  {
    name: 'Applications',
    href: '/applications',
    icon: ServerStackIcon,
    isVisible: (user?: User) => user?.type === 'CANDIDATE',
    checkIsActive: (pathname: string) => pathname === '/applications',
  },
  {
    name: 'Positions',
    href: '/positions',
    icon: BriefcaseIcon,
    isVisible: (user?: User) => true,
    checkIsActive: (pathname: string) => pathname === '/positions',
  },
  {
    name: 'Questions',
    href: '/questions',
    isVisible: (user?: User) => true,
    icon: QuestionMarkCircleIcon,
    checkIsActive: (pathname: string) => pathname === '/questions',
  },
  {
    name: 'Interviews',
    href: '/interviews',
    icon: CalendarDaysIcon,
    isVisible: (user?: User) => true,
    checkIsActive: (pathname: string) => pathname === '/interviews',
  },
];

export default navigation;
