import { graphql } from '../types';

export const REFRESH = graphql(`
  query Refresh {
    refresh {
      user {
        id
        firstname
        email
        type
        candidateId
        recruiterId
        candidate {
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
