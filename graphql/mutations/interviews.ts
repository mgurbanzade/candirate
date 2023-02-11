import { graphql } from '../types';

export const CREATE_INTERVIEW_MUTATION = graphql(`
  mutation createInterview(
    $createInterviewInput: CreateInterviewInput!
    $applicationId: Int!
    $positionId: Int!
  ) {
    createInterview(
      createInterviewInput: $createInterviewInput
      applicationId: $applicationId
      positionId: $positionId
    ) {
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

export const UPDATE_INTERVIEW_MUTATION = graphql(`
  mutation updateInterview(
    $id: Int!
    $updateInterviewInput: UpdateInterviewInput!
    $positionId: Int!
  ) {
    updateInterview(
      id: $id
      updateInterviewInput: $updateInterviewInput
      positionId: $positionId
    ) {
      id
    }
  }
`);

export const IMPORT_QUESTIONS_MUTATION = graphql(`
  mutation importQuestions(
    $questionIds: [Int]!
    $interviewId: Int!
    $positionId: Int!
  ) {
    importQuestions(
      questionIds: $questionIds
      interviewId: $interviewId
      positionId: $positionId
    ) {
      __typename
    }
  }
`);

export const DECLINE_INTERVIEW_MUTATION = graphql(`
  mutation declineInterview(
    $id: Int!
    $declineInterviewInput: DeclineInterviewInput!
    $positionId: Int!
  ) {
    declineInterview(
      id: $id
      declineInterviewInput: $declineInterviewInput
      positionId: $positionId
    ) {
      status
    }
  }
`);
