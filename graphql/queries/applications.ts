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
        order
        interview {
          id
          uuid
          title
          description
          format
          meetingLink
          startsAt
          endsAt
          questions {
            id
            title
            points
          }
        }
      }
      position {
        id
        uuid
        title
        salaryRateType
        type
        description
        requiredSkills {
          id
          name
        }
        company {
          id
          name
        }
        hiringSteps {
          id
          title
          order
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
