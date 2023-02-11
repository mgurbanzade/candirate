import { graphql } from '../types';

export const GET_INTERVIEWS = graphql(`
  query GetInterviews($getInterviewsWhereInput: GetInterviewsWhereInput!) {
    getInterviews(getInterviewsWhereInput: $getInterviewsWhereInput) {
      id
      uuid
      title
      description
      meetingLink
      startsAt
      endsAt
      status
      hiringStepId
      applicationId
      positionId
    }
  }
`);

export const GET_INTERVIEW = graphql(`
  query GetInterview($uuid: String!) {
    getInterview(uuid: $uuid) {
      id
      uuid
      title
      description
      format
      meetingLink
      startsAt
      endsAt
      status
      candidateId
      positionId
      recruiterId
      declineReason
      declinedBy
      hiringStepId
      application {
        uuid
        candidate {
          uuid
        }
      }
      questions {
        id
        title
        points
      }
    }
  }
`);
