import { graphql } from '../types';

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

export const ADD_SKILL_TO_CANDIDATE_MUTATION = graphql(`
  mutation AddSkillToCandidate($candidateId: Int!, $skillName: String!) {
    addSkillToCandidate(candidateId: $candidateId, skillName: $skillName) {
      skills {
        id
        name
      }
    }
  }
`);

export const REMOVE_SKILL_FROM_CANDIDATE_MUTATION = graphql(`
  mutation RemoveSkillFromCandidate($candidateId: Int!, $skillId: Int!) {
    removeSkillFromCandidate(candidateId: $candidateId, skillId: $skillId) {
      skills {
        id
        name
      }
    }
  }
`);

export const PROPOSE_POSITION_MUTATION = graphql(`
  mutation ProposePosition($proposePositionInput: ProposePositionInput!) {
    proposePosition(proposePositionInput: $proposePositionInput) {
      uuid
    }
  }
`);
