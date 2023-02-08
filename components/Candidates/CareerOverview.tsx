import Link from 'next/link';
import Tags from '@components/Tags';
import { PaperClipIcon } from '@heroicons/react/20/solid';
import { Candidate } from '@gql/types/graphql';
import { candidateProfilePath } from '@lib/routes';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid';

type Props = {
  candidate: Candidate;
  showLink?: boolean;
};

const getSalaryRate = (salaryRateType: string) => {
  return salaryRateType === 'HOURLY'
    ? 'hour'
    : salaryRateType === 'MONTHLY'
    ? 'month'
    : 'year';
};

export default function CareerOverview({ candidate, showLink }: Props) {
  if (!candidate) {
    return null;
  }

  const salaryRateType = getSalaryRate(candidate.salaryRateType || 'MONTHLY');

  return (
    <>
      <div className="flex justify-between items-center px-4 py-5 sm:px-6">
        <h2
          id="candidate-information-title"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {candidate.positionTitle}
        </h2>
        {showLink && (
          <Link
            href={candidateProfilePath(candidate.uuid as string)}
            target="_blank"
          >
            <ArrowTopRightOnSquareIcon className="w-6 h-6 text-gray-500" />
          </Link>
        )}
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Position title
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {candidate.positionTitle || 'none'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Years of experience
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              {candidate.yearsOfExperience || 'none'}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">
              Salary expectation
            </dt>
            <dd className="mt-1 text-sm text-gray-900">
              $
              {candidate.salaryExpectation
                ? `${candidate.salaryExpectation} / ${salaryRateType}`
                : 'none'}
            </dd>
          </div>
          {candidate.skills && candidate.skills.length > 0 ? (
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Skills</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <Tags tags={candidate.skills} isDraggable={false} />
              </dd>
            </div>
          ) : null}
          <div className="sm:col-span-2">
            <dt className="text-sm font-medium text-gray-500">Brief info</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {candidate.about || 'none'}
            </dd>
          </div>
          {candidate.resumeUrl && (
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Resume</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <div
                  role="list"
                  className="divide-y divide-gray-200 rounded-md border border-gray-200"
                >
                  <div className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                    <div className="flex w-0 flex-1 items-center">
                      <PaperClipIcon
                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="ml-2 w-0 flex-1 truncate">
                        {candidate.resumeUrl?.split('/').pop()}
                      </span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <a
                        href={candidate.resumeUrl as string}
                        target="_blank"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </>
  );
}
