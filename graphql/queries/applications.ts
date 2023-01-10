import { graphql } from '../types';

export const GET_APPLICATION = graphql(`
  query GetApplication($uuid: String!) {
    getApplication(uuid: $uuid) {
      id
      uuid
      status
      currentStep {
        id
        title
      }
      position {
        id
        title
        hiringSteps {
          id
          title
        }
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
