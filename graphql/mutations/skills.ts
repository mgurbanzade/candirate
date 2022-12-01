import { graphql } from '../types';

export const CREATE_SKILL_MUTATION = graphql(`
  mutation CreateSkill($createSkillInput: CreateSkillInput!, candidateId: ID!) {
    createSkill(createSkillInput: $createSkillInput, candidateId: $candidateId) {
      id
      name
    }
  }
`);
