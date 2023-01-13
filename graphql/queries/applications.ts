import { graphql } from '../types';

export const GET_APPLICATION = graphql(`
  query GetApplication($uuid: String!, $candidateId: Int) {
    getApplication(uuid: $uuid, candidateId: $candidateId) {
      id
      uuid
      status
      declineMessage
      currentStep {
        id
        title
        order
      }
      upcomingInterview {
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
      position {
        id
        uuid
        title
        salaryRateType
        salaryRate
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
