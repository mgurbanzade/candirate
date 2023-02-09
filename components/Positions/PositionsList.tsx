import { Position } from '@gql/types/graphql';
import PositionsListItem from './PositionsListItem';

type Props = {
  positions: Position[];
};

export default function PositionsList({ positions }: Props) {
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
