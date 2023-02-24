import { useRouter } from 'next/router';
import { GET_POSITION } from '@gql/queries/positions';
import { useQuery } from '@apollo/client';
import Page from '@components/Positions/PositionPageContainer';

const PositionPage = () => {
  const router = useRouter();
  const { data, refetch } = useQuery(GET_POSITION, {
    skip: !router.query.uuid,
    variables: {
      uuid: router.query.uuid as string,
    },
  });

  const position = data?.getPosition;

  return (
    position?.title && <Page position={position} refetchPosition={refetch} />
  );
};

export default PositionPage;
