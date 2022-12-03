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

  return <CareerOverview candidate={data?.getCandidateProfile} />;
};

export default CandidateProfileContainer;
