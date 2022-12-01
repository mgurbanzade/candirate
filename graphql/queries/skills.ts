import { graphql } from '../types';

export const SEARCH_SKILLS = graphql(`
  query SearchSkills($query: String!) {
    searchSkills(query: $query) {
      id
      name
    }
  }
`);
