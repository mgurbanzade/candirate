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
      questions {
        id
        title
        points
      }
    }
  }
`);

export const GET_RESERVED_TIMESTAMPS = graphql(`
  query GetReservedTimestamps($timestampInput: TimestampInput!) {
    getReservedTimestamps(timestampInput: $timestampInput) {
      startsAt
      endsAt
    }
  }
`);
