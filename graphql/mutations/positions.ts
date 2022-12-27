import { graphql } from '../types';

export const CREATE_POSITION_MUTATION = graphql(`
  mutation CreatePosition($createPositionInput: CreatePositionInput!) {
    createPosition(createPositionInput: $createPositionInput) {
      title
      description
    }
  }
`);

export const UPDATE_POSITION_MUTATION = graphql(`
  mutation UpdatePosition(
    $id: Int!
    $updatePositionInput: UpdatePositionInput!
  ) {
    updatePosition(id: $id, updatePositionInput: $updatePositionInput) {
      title
      description
    }
  }
`);

export const PUBLISH_POSITION_MUTATION = graphql(`
  mutation PublishPosition($id: Int!) {
    publishPosition(id: $id) {
      id
      title
      isPublished
    }
  }
`);

export const APPLY_POSITION_MUTATION = graphql(`
  mutation ApplyPosition($positionId: Int!, $candidateId: Int!) {
    applyToPosition(positionId: $positionId, candidateId: $candidateId) {
      id
    }
  }
`);

export const ADD_SKILL_TO_POSITION_MUTATION = graphql(`
  mutation AddSkillToPosition($positionId: Int!, $skillName: String!) {
    addSkillToPosition(positionId: $positionId, skillName: $skillName) {
      requiredSkills {
        id
        name
      }
    }
  }
`);

export const REMOVE_SKILL_FROM_POSITION_MUTATION = graphql(`
  mutation RemoveSkillFromPosition($positionId: Int!, $skillId: Int!) {
    removeSkillFromPosition(positionId: $positionId, skillId: $skillId) {
      requiredSkills {
        id
        name
      }
    }
  }
`);
