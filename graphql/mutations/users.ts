import { graphql } from '../types';

export const RESET_PASSWORD_MUTATION = graphql(`
  mutation ResetPassword($resetPasswordInput: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $resetPasswordInput) {
      email
    }
  }
`);

export const UPDATE_USER_MUTATION = graphql(`
  mutation UpdateUser($id: Int!, $updateUserInput: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $updateUserInput) {
      __typename
    }
  }
`);
