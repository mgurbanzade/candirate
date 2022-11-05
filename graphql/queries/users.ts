import { graphql } from '../types';

export const GET_USERS = graphql(`
  query GetUsers {
    getAllUsers {
      firstname
      type
    }
  }
`);

export const GET_CURRENT_USER = graphql(`
  query GetCurrentUser {
    getCurrentUser {
      user {
        id
        firstname
        email
        type
      }
    }
  }
`);
