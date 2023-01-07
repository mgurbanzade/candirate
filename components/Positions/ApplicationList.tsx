import Link from 'next/link';
import cx from 'classnames';
import useSession from '@hooks/useSession';
import Modal from '@components/Generic/Modal';
import DeclineModalForm from '@components/Applications/DeclineModalForm';
import { useState } from 'react';
import { useModal } from '@hooks/useModal';
import { Application } from '@gql/types/graphql';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { interviewPath, scheduleInterviewPath } from '@lib/routes';
import { useRouter } from 'next/router';

type Props = {
  applications: Application[];
};

const ApplicationList = ({ applications }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [currApplicationId, setCurrApplicationId] = useState<
    number | null | undefined
  >(null);
  const { setIsVisible } = useModal();
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
                        {app.status !== 'INVITED' && (
                          <button
                            type="button"
                            onClick={() => {
                              setCurrApplicationId(app.id);
                              setIsVisible(true);
                            }}
                            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
                          >
                            Decline
                          </button>
                        )}
                        <button
                          type="button"
                          className={cx(
                            'ml-3 inline-flex items-center justify-center rounded-md border border-transparent px-4 pr-3 py-2 text-sm font-medium text-white shadow-sm focus:outline-none',
                            {
                              'bg-blue-600 hover:bg-blue-700':
                                app.status !== 'INVITED',
                              'bg-green-600 hover:bg-green-700':
                                app.status === 'INVITED',
                            },
                          )}
                          onClick={() => {
                            const path =
                              app.status === 'INVITED'
                                ? interviewPath(app?.interview?.uuid as string)
                                : scheduleInterviewPath(
                                    app?.uuid as string,
                                    app?.candidate?.uuid as string,
                                  );
                            router.push(path);
                          }}
                        >
                          {app.status === 'INVITED' ? 'Scheduled' : 'Schedule'}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 ml-2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
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
      <Modal>
        <DeclineModalForm
          appId={currApplicationId as number}
          setIsVisible={setIsVisible}
          setCurrApplicationId={setCurrApplicationId}
        />
      </Modal>
    </div>
  );
};

export default ApplicationList;
