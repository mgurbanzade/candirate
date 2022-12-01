import { graphql } from '../types';

export const UPDATE_USER_MUTATION = graphql(`
  mutation UpdateUser($id: Int!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      __typename
    }
  }
`);
