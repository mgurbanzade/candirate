import PositionsHeader from './PositionsHeader';
import PositionsList from './PositionsList';
import { Position } from '@gql/types/graphql';
import { useQuery } from '@apollo/client';
import { GET_POSITIONS } from '@gql/queries/positions';
import useSession from '@hooks/useSession';

const Positions = () => {
  const { currentUser } = useSession();
  const { data, refetch } = useQuery(GET_POSITIONS, {
    variables: {
      where: {
        authorId:
          currentUser?.type === 'RECRUITER' ? currentUser?.recruiterId : 1,
      },
    },
  });

  return (
    <main className="px-6 py-6">
      <div className="h-96 rounded-lg">
        <div className="overflow-hidden bg-white shadow sm:rounded-md">
          <PositionsHeader refetchPositions={refetch} />
          <PositionsList
            positions={(data?.getAllPositions as Position[]) || []}
          />
        </div>
      </div>
    </main>
  );
};

export default Positions;
