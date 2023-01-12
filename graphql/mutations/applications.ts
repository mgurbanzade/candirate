import { graphql } from '../types';

export const UPDATE_APPLICATION_MUTATION = graphql(`
  mutation UpdateApplication(
    $id: Int!
    $updateApplicationInput: UpdateApplicationInput!
  ) {
    updateApplication(
      id: $id
      updateApplicationInput: $updateApplicationInput
    ) {
      status
    }
  }
`);

export const DECLINE_APPLICATION_MUTATION = graphql(`
  mutation DeclineApplication(
    $id: Int!
    $declineApplicationInput: DeclineApplicationInput!
  ) {
    declineApplication(
      id: $id
      declineApplicationInput: $declineApplicationInput
    ) {
      status
    }
  }
`);
