import { graphql } from './types';

export const GET_USERS = graphql(`
  query GetUsers {
    getAllUsers {
      firstname
      type
    }
  }
`);
