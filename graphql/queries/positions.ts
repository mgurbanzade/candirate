import { graphql } from '../types';

export const GET_POSITION = graphql(`
  query getPosition($uuid: String!, $isCandidate: Boolean!) {
    getPosition(uuid: $uuid) {
      id
      uuid
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
      applications {
        id
        status
        candidate {
          id
          uuid
          positionTitle
          yearsOfExperience
          salaryExpectation
          salaryRateType
        }
      }
      applicationStatus @include(if: $isCandidate)
    }
  }
`);

export const GET_POSITIONS = graphql(`
  query GetPositions($where: PositionWhereInput!) {
    getAllPositions(where: $where) {
      id
      uuid
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
