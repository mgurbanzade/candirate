import { graphql } from '../types';

export const CREATE_QUESTION_MUTATION = graphql(`
  mutation CreateQuestion($createQuestionInput: CreateQuestionInput!) {
    createQuestion(createQuestionInput: $createQuestionInput) {
      id
    }
  }
`);

export const UPDATE_QUESTION = graphql(`
  mutation UpdateQuestion(
    $id: Int!
    $updateQuestionInput: UpdateQuestionInput!
  ) {
    updateQuestion(id: $id, updateQuestionInput: $updateQuestionInput) {
      id
      title
      points
    }
  }
`);

export const REMOVE_QUESTIONS = graphql(`
  mutation RemoveQuestions($ids: [Int!]!) {
    removeQuestions(ids: $ids) {
      __typename
    }
  }
`);
