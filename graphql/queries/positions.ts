import { graphql } from '../types';

export const GET_POSITION = graphql(`
  query getPosition($uuid: String!) {
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
      hiringSteps {
        id
        title
        positionId
      }
      requiredSkills {
        id
        name
      }
      company {
        id
        name
      }
      suggestedCandidates {
        id
        uuid
        positionTitle
        yearsOfExperience
        salaryExpectation
        salaryRateType
      }
      applications {
        id
        uuid
        status
        candidate {
          id
          uuid
          positionTitle
          yearsOfExperience
          salaryExpectation
          salaryRateType
        }
        interviews {
          uuid
        }
      }
      applicationStatus
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
