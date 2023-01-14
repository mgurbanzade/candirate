import { graphql } from '../types';

export const CREATE_TIMESLOT = graphql(`
  mutation CreateTimeslot(
    $createTimeslotInput: CreateTimeslotInput!
    $candidateId: Int!
    $applicationId: Int!
  ) {
    createTimeslot(
      createTimeslotInput: $createTimeslotInput
      candidateId: $candidateId
      applicationId: $applicationId
    ) {
      id
    }
  }
`);

export const DELETE_TIMESLOT = graphql(`
  mutation DeleteTimeslot($id: Int!) {
    deleteTimeslot(id: $id) {
      __typename
    }
  }
`);
