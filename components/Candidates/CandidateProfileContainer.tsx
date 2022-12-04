import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_CANDIDATE_PROFILE } from '@gql/queries/candidates';
import CareerOverview from './CareerOverview';

const CandidateProfileContainer = () => {
  const router = useRouter();
  const { data } = useQuery(GET_CANDIDATE_PROFILE, {
    skip: !router.query.uuid,
    variables: { uuid: router.query.uuid as string },
  });

  if (!data?.getCandidateProfile) return null;

  return (
    <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
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
