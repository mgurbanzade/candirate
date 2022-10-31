import { graphql } from './types';

export const LOGIN_MUTATION = graphql(`
  mutation Login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput) {
      accessToken
      user {
        firstname
      }
    }
  }
`);

export const SIGNUP_MUTATION = graphql(`
  mutation Signup($signupUserInput: SignupUserInput!) {
    signup(signupUserInput: $signupUserInput) {
      user {
        firstname
      }
    }
  }
`);
