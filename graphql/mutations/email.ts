import { graphql } from '../types';

export const VERIFY_ACCOUNT_MUTATION = graphql(`
  mutation VerifyAccount($token: String!) {
    verifyAccount(token: $token) {
      success
    }
  }
`);

export const RESEND_VERIFICATION_LINK_MUTATION = graphql(`
  mutation ResendVerificationLink($email: String!) {
    resendVerificationLink(email: $email) {
      success
    }
  }
`);

export const SEND_PASSWORD_RESET_LINK_MUTATION = graphql(`
  mutation SendPasswordResetLink($email: String!) {
    sendPasswordResetLink(email: $email) {
      success
    }
  }
`);
