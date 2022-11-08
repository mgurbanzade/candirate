import { graphql } from '../types';

export const SEARCH_COMPANIES = graphql(`
  query SearchCompanies($query: String!) {
    searchCompanies(query: $query) {
      id
      name
    }
  }
`);
