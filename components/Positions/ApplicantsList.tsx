import Link from 'next/link';
import { Candidate } from '@gql/types/graphql';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';

type Props = {
  applicants: Candidate[];
};

const ApplicantsList = ({ applicants }: Props) => {
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
        {applicants.map((applicant) => (
          <li key={applicant.id}>
            <Link
              href={`/candidates/${applicant.uuid}`}
              className="block hover:bg-gray-50"
            >
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="truncate text-sm font-medium text-indigo-600">
                    {applicant.positionTitle}
                  </p>
                  <div className="flex">
                    <p className="flex items-center text-sm text-gray-500 ml-4">
                      <CurrencyDollarIcon
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        aria-hidden="true"
                      />
                      {applicant.salaryExpectation} /{' '}
                      {applicant.salaryRateType.toLowerCase()}
                    </p>
                    <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 ml-4">
                      {applicant.yearsOfExperience} years
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicantsList;
