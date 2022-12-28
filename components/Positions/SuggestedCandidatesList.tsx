import Link from 'next/link';
import { Candidate } from '@gql/types/graphql';
import { CurrencyDollarIcon } from '@heroicons/react/20/solid';
import { candidateProfilePath } from '@lib/routes';

type Props = {
  candidates: Candidate[];
};

const SuggestedCandidatesList = ({ candidates }: Props) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-md">
      <div className="px-4 py-5 sm:px-6">
        <h2
          id="position-details"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Candidates that may fit
        </h2>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-200 border-t border-gray-200"
      >
        {candidates.map((candidate) => (
          <li key={candidate?.id}>
            <div className="block hover:bg-gray-50">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <Link href={candidateProfilePath(candidate?.uuid as string)}>
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {candidate?.positionTitle}
                    </p>
                  </Link>
                  <div className="flex items-center justify-end grow">
                    <div className="flex">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800 ml-4">
                        {candidate?.yearsOfExperience} years
                      </p>
                    </div>
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

export default SuggestedCandidatesList;
