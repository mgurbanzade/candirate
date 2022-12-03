import { graphql } from '../types';

export const GET_CANDIDATE_PROFILE = graphql(`
  query GetCandidateProfile($uuid: String!) {
    getCandidateProfile(uuid: $uuid) {
      id
      uuid
      positionTitle
      yearsOfExperience
      salaryExpectation
      salaryRateType
      about
      skills {
        id
        name
      }
    }
  }
`);
