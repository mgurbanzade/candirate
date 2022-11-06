import { useQuery } from '@apollo/client';
import { GET_POSITIONS } from '@gql/queries/positions';
import { Position } from '@gql/types/graphql';
import PositionsListItem from './PositionsListItem';

export default function PositionsList() {
  const { data } = useQuery(GET_POSITIONS, {
    variables: {
      where: {
        postedById: 1,
      },
    },
  });

  const positions = data?.getAllPositions;

  return positions ? (
    <ul role="list" className="divide-y divide-gray-200">
      {positions.map((position) => (
        <li key={position?.id}>
          <PositionsListItem position={position as Position} />
        </li>
      ))}
    </ul>
  ) : null;
}
