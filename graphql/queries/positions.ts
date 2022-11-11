import { graphql } from '../types';

export const GET_POSITION = graphql(`
  query getPosition($id: Int!) {
    getPosition(id: $id) {
      id
      title
      description
      type
      isRemoteWorldWide
      location
      isPublished
      salaryRate
      salaryRateType
      authorId
      company {
        id
        name
      }
      applicants {
        id
        firstname
      }
      hasApplied
    }
  }
`);

export const GET_POSITIONS = graphql(`
  query GetPositions($where: PositionWhereInput!) {
    getAllPositions(where: $where) {
      id
      title
      description
      type
      isRemoteWorldWide
      location
      isPublished
      salaryRate
      salaryRateType
      company {
        id
        name
      }
    }
  }
`);
