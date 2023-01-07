import { graphql } from '../types';

export const GET_APPLICATION = graphql(`
  query GetApplication($uuid: String!) {
    getApplication(uuid: $uuid) {
      id
      uuid
      position {
        id
        title
      }
      candidate {
        id
        positionTitle
        user {
          firstname
        }
      }
    }
  }
`);

export const GET_APPLICATIONS = graphql(`
  query GetApplications($candidateId: Int!) {
    getApplications(candidateId: $candidateId) {
      id
      uuid
      status
      position {
        id
        title
        company {
          id
          name
        }
      }
    }
  }
`);
