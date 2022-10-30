import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      accessToken
      user {
        firstname
      }
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation Signup($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      user {
        firstname
      }
    }
  }
`;
