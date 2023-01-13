import cx from 'classnames';
import Link from 'next/link';
import useSession from '@hooks/useSession';
import { useRouter } from 'next/router';
import { Application } from '@gql/types/graphql';
import { applicationPath } from '@lib/routes';
import {
  CurrencyDollarIcon,
  CalendarDaysIcon,
} from '@heroicons/react/20/solid';

type Props = {
  applications: Application[];
};

const ApplicationList = ({ applications }: Props) => {
  const session = useSession();
  const router = useRouter();
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h2
          id="position-details"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Candidates applied
        </h2>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-200 border-t border-gray-200"
      >
        {applications.map((app) => (
          <li key={app?.id}>
            <div className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <Link href={`/candidates/${app?.candidate?.uuid}`}>
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {app?.candidate?.positionTitle}
                    </p>
                  </Link>
                  <div className="flex items-center justify-end grow">
                    <div className="flex">
                      <p className="flex items-center text-sm text-gray-500 ml-4">
                        <CurrencyDollarIcon
                          className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                          aria-hidden="true"
                        />
                        {app?.candidate?.salaryExpectation} /{' '}
                        {app?.candidate?.salaryRateType.toLowerCase()}
                      </p>
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 ml-4">
                        {app?.candidate?.yearsOfExperience} years
                      </p>
                    </div>
                    {session?.currentUser?.type === 'RECRUITER' && (
                      <div className="flex items-center justify-end ml-3">
                        <button
                          type="button"
                          className={cx(
                            'ml-3 inline-flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm focus:outline-none',
                            {
                              'bg-blue-600 hover:bg-blue-700':
                                app.status !== 'INVITED',
                              'bg-green-600 hover:bg-green-700':
                                app.status === 'INVITED',
                            },
                          )}
                          onClick={() => {
                            const path = applicationPath(app?.uuid as string);
                            router.push(path);
                          }}
                        >
                          {app.status === 'INVITED'
                            ? 'Scheduled'
                            : 'See details'}
                          {app.status === 'INVITED' && (
                            <CalendarDaysIcon className="w-6 h-6 ml-2" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationList;
