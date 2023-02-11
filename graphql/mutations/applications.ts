import { graphql } from '../types';

export const HIRE_APPLICATION_MUTATION = graphql(`
  mutation HireApplication(
    $id: Int!
    $redirectPath: String!
    $positionId: Int!
  ) {
    hireApplication(
      id: $id
      redirectPath: $redirectPath
      positionId: $positionId
    ) {
      status
    }
  }
`);

export const DECLINE_APPLICATION_MUTATION = graphql(`
  mutation DeclineApplication(
    $id: Int!
    $declineApplicationInput: DeclineApplicationInput!
    $positionId: Int!
  ) {
    declineApplication(
      id: $id
      declineApplicationInput: $declineApplicationInput
      positionId: $positionId
    ) {
      status
    }
  }
`);
