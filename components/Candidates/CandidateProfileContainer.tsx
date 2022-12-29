import cx from 'classnames';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import {
  GET_CANDIDATE_PROFILE,
  GET_PROPOSAL_STATUS,
} from '@gql/queries/candidates';
import { PROPOSE_POSITION_MUTATION } from '@gql/mutations/candidates';

import useSession from '@hooks/useSession';
import CareerOverview from './CareerOverview';

const CandidateProfileContainer = () => {
  const router = useRouter();
  const { currentUser } = useSession();
  const [proposePosition] = useMutation(PROPOSE_POSITION_MUTATION);
  const { data: statusData, refetch: refetchStatus } = useQuery(
    GET_PROPOSAL_STATUS,
    {
      skip: !router.query.position,
      variables: {
        positionUuid: router.query.position as string,
        uuid: router.query.uuid as string,
      },
    },
  );
  const { data, refetch } = useQuery(GET_CANDIDATE_PROFILE, {
    skip: !router.query.uuid,
    variables: { uuid: router.query.uuid as string },
  });

  if (!data?.getCandidateProfile) return null;

  const handleProposePosition = async () => {
    try {
      const res = await proposePosition({
        variables: {
          proposePositionInput: {
            title: 'You have been proposed for a position',
            body: `${currentUser?.firstname} ${currentUser?.lastname} invited you to check out a position`,
            positionUuid: router.query.position as string,
            candidateUuid: router.query.uuid as string,
          },
        },
      });

      if (res?.data?.proposePosition.uuid) {
        refetch();
        refetchStatus();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3 pt-6">
      {currentUser?.type === 'RECRUITER' && router.query.position && (
        <div className="flex space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <div className="flex items-start w-full justify-end">
            <button
              type="button"
              onClick={handleProposePosition}
              className={cx(
                'shadow-none inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100',
                {
                  'bg-green-500 hover:bg-green-500 text-white':
                    statusData?.getProposalStatus === 'PROPOSED',
                },
              )}
            >
              {statusData?.getProposalStatus === 'NOT_PROPOSED' &&
                'Propose position'}

              {statusData?.getProposalStatus === 'PROPOSED' && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="ml-1">Proposed</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
      <div className="space-y-6 lg:col-span-2 lg:col-start-1">
        <section aria-labelledby="user-information">
          <div className="bg-white shadow sm:rounded-lg">
            <CareerOverview candidate={data?.getCandidateProfile} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default CandidateProfileContainer;
