import Link from 'next/link';
import { Badge } from 'flowbite-react';
import { DateTime } from 'luxon';
import { Interview } from '@gql/types/graphql';

import {
  ArrowTopRightOnSquareIcon,
  ChatBubbleBottomCenterIcon,
  ClockIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid';
import { interviewPath } from '@lib/routes';

type Props = {
  interview: Interview;
  headerTitle: string;
};

export default function UpcomingInterview({ interview, headerTitle }: Props) {
  if (!interview) {
    return null;
  }

  const interviewDate = DateTime.fromISO(interview.startsAt);
  const interviewEndDate = DateTime.fromISO(interview.endsAt);
  const interviewStartTime = interviewDate.toFormat('h:mm a, dd MMM yyyy');
  const isPastEvent = interviewDate < DateTime.local();
  const isCancelled = interview.status === 'CANCELLED';
  const durationInMinutes = interviewEndDate.diff(
    interviewDate,
    'minutes',
  ).minutes;

  return (
    <section>
      <div className="bg-white shadow sm:rounded-lg h-full">
        <div>
          <div className="flex justify-between items-center px-4 py-5 sm:px-6">
            <div className="flex items-center">
              {isPastEvent ? (
                <Badge color="failure">Completed</Badge>
              ) : isCancelled ? (
                <Badge color="failure">Cancelled</Badge>
              ) : (
                <Badge color="success">Upcoming</Badge>
              )}
              <h2 className="text-lg font-medium leading-6 text-gray-900 ml-2">
                {headerTitle}
              </h2>
            </div>

            <Link
              href={interviewPath(interview.uuid as string)}
              target="_blank"
            >
              <ArrowTopRightOnSquareIcon className="w-6 h-6 text-gray-500" />
            </Link>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
            <h3 className="mt-1 text-indigo-700 font-bold">
              {interview.title}
            </h3>
            <p className="text-gray-600 font-medium mb-8">
              {interviewStartTime}
            </p>
            <p className="text-gray-600 flex items-center mb-8">
              <ClockIcon className="w-4 h-4 text-indigo-700 mr-2" />
              {durationInMinutes} min
            </p>
            <p className="text-gray-600 flex items-center mb-8">
              <MapPinIcon className="w-4 h-4 text-indigo-700 mr-2" />
              {interview.meetingLink || 'No meeting link provided'}
            </p>
            <p className="text-gray-600 flex items-center mb-8">
              <ChatBubbleBottomCenterIcon className="w-4 h-4 text-indigo-700 mr-2" />
              {interview.description || 'No description provided'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
