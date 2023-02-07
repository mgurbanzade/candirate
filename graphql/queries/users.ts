import { graphql } from '../types';

export const GET_USERS = graphql(`
  query GetUsers {
    getAllUsers {
      firstname
      type
    }
  }
`);

export const GET_CURRENT_USER = graphql(`
  query GetCurrentUser {
    getCurrentUser {
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

export const GET_USER_PROFILE = graphql(`
  query GetUserProfile {
    getUserProfile {
      id
      firstname
      middlename
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
        resumeUrl
        skills {
          id
          name
        }
      }
      recruiter {
        id
      }
    }
  }
`);
