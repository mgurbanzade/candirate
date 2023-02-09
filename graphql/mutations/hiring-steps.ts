import { graphql } from '../types';

export const CREATE_HIRING_STEP = graphql(`
  mutation CreateHiringStep(
    $createHiringStepInput: CreateHiringStepInput!
    $positionId: Int!
  ) {
    createHiringStep(
      createHiringStepInput: $createHiringStepInput
      positionId: $positionId
    ) {
      id
      title
    }
  }
`);

export const UPDATE_HIRING_STEP = graphql(`
  mutation UpdateHiringStep(
    $id: Int!
    $positionId: Int!
    $updateHiringStepInput: UpdateHiringStepInput!
  ) {
    updateHiringStep(
      id: $id
      positionId: $positionId
      updateHiringStepInput: $updateHiringStepInput
    ) {
      id
      title
    }
  }
`);

export const DELETE_HIRING_STEP = graphql(`
  mutation DeleteHiringStep($id: Int!, $positionId: Int!) {
    deleteHiringStep(id: $id, positionId: $positionId) {
      __typename
    }
  }
`);
