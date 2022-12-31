import cx from 'classnames';
import useSession from '@hooks/useSession';
import { Interview } from '@gql/types/graphql';
import { DateTime } from 'luxon';

type Props = {
  interview: Interview;
  setViewState: (viewState: 'show' | 'edit') => void;
};

export default function ShowSection({ interview, setViewState }: Props) {
  const { currentUser } = useSession();
  if (!interview) {
    return null;
  }

  const interviewDate = DateTime.fromISO(interview.startsAt);
  const interviewEndDate = DateTime.fromISO(interview.endsAt);
  const interviewStartTime = interviewDate.toFormat('h:mm a, dd MMM yyyy');
  const durationInMinutes = interviewEndDate.diff(
    interviewDate,
    'minutes',
  ).minutes;

  return (
    <>
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium leading-6 text-gray-900">
          Interview details
        </h2>
        {currentUser?.recruiterId && (
          <button
            type="button"
            onClick={() => setViewState('edit')}
            className={cx(
              'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none border-transparent border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
            )}
          >
            Edit
          </button>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          {currentUser?.recruiterId && (
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Interview title
              </dt>
              <dd className="mt-1 text-sm text-gray-900">{interview.title}</dd>
            </div>
          )}
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">When</dt>
            <dd className="mt-1 text-sm text-gray-900">{interviewStartTime}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Meeting link</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {interview.meetingLink || 'none'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Duration</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {durationInMinutes} min
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">
              {currentUser?.recruiterId
                ? 'Notes for the candidate'
                : `Notes for ${currentUser?.firstname}`}
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {interview.description || 'none'}
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
