import { graphql } from '../types';

export const CREATE_INTERVIEW_MUTATION = graphql(`
  mutation createInterview($createInterviewInput: CreateInterviewInput!) {
    createInterview(createInterviewInput: $createInterviewInput) {
      id
      title
      meetingLink
      format
      candidateId
      positionId
      startsAt
      feedbackId
    }
  }
`);
