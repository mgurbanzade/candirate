import { useRouter } from 'next/router';
import useSession from '@hooks/useSession';
import { GET_POSITION } from '@gql/queries/positions';
import { useQuery } from '@apollo/client';
import Page from '@components/Positions/PositionPageContainer';

const PositionPage = () => {
  const router = useRouter();
  const session = useSession();
  const { data, refetch } = useQuery(GET_POSITION, {
    skip: !router.query.id,
    variables: {
      id: Number(router.query.id),
      isCandidate: session?.currentUser?.type === 'CANDIDATE',
    },
  });

  const position = data?.getPosition;

  return (
    position?.title && <Page position={position} refetchPosition={refetch} />
  );
};

export default PositionPage;
