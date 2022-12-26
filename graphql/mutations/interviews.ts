import { graphql } from '../types';

export const CREATE_INTERVIEW_MUTATION = graphql(`
  mutation createInterview(
    $createInterviewInput: CreateInterviewInput!
    $applicationId: Int!
  ) {
    createInterview(
      createInterviewInput: $createInterviewInput
      applicationId: $applicationId
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
  ) {
    updateInterview(id: $id, updateInterviewInput: $updateInterviewInput) {
      id
    }
  }
`);

export const IMPORT_QUESTIONS_MUTATION = graphql(`
  mutation importQuestions($questionIds: [Int]!, $interviewId: Int!) {
    importQuestions(questionIds: $questionIds, interviewId: $interviewId) {
      __typename
    }
  }
`);
