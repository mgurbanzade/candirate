import { graphql } from '../types';

export const UPDATE_USER_MUTATION = graphql(`
  mutation UpdateUser($id: Int!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      __typename
    }
  }
`);

export const UPDATE_CANDIDATE_MUTATION = graphql(`
  mutation UpdateCandidate(
    $candidateId: Int!
    $updateCandidateInput: UpdateCandidateInput!
  ) {
    updateCandidate(
      candidateId: $candidateId
      updateCandidateInput: $updateCandidateInput
    ) {
      positionTitle
      yearsOfExperience
    }
  }
`);
