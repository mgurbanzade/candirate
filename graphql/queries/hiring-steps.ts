import { graphql } from '../types';

export const GET_HIRING_STEPS = graphql(`
  query GetHiringSteps($where: GetHiringStepsWhereInput) {
    getHiringSteps(where: $where) {
      id
      title
      positionId
    }
  }
`);
