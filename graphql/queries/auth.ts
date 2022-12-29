import { graphql } from '../types';

export const REFRESH = graphql(`
  query Refresh {
    refresh {
      accessToken
      expSeconds
      user {
        id
        firstname
        lastname
        email
        type
        candidateId
        recruiterId
        candidate {
          id
          uuid
          positionTitle
          yearsOfExperience
          salaryExpectation
          salaryRateType
          about
        }
      }
    }
  }
`);
