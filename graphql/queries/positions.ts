import { graphql } from '../types';

export const GET_POSITIONS = graphql(`
  query GetPositions($where: PositionWhereInput!) {
    getAllPositions(where: $where) {
      id
      title
      description
    }
  }
`);
