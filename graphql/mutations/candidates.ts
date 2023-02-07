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

export const UPLOAD_RESUME_MUTATION = graphql(`
  mutation UploadResume($candidateId: Int!, $resume: Upload!) {
    uploadResume(candidateId: $candidateId, resume: $resume) {
      __typename
      resumeUrl
    }
  }
`);

export const REMOVE_RESUME_MUTATION = graphql(`
  mutation RemoveResume($candidateId: Int!, $key: String!) {
    removeResume(candidateId: $candidateId, key: $key) {
      __typename
      resumeUrl
    }
  }
`);
