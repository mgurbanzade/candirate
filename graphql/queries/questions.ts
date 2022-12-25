import { graphql } from '../types';

export const GET_QUESTIONS = graphql(`
  query GetQuestions($recruiterId: Int!) {
    getQuestions(recruiterId: $recruiterId) {
      id
      title
      points
    }
  }
`);
