import { graphql } from '../types';

export const CREATE_HIRING_STEP = graphql(`
  mutation CreateHiringStep($createHiringStepInput: CreateHiringStepInput!) {
    createHiringStep(createHiringStepInput: $createHiringStepInput) {
      id
      title
    }
  }
`);

export const UPDATE_HIRING_STEP = graphql(`
  mutation UpdateHiringStep(
    $id: Int!
    $updateHiringStepInput: UpdateHiringStepInput!
  ) {
    updateHiringStep(id: $id, updateHiringStepInput: $updateHiringStepInput) {
      id
      title
    }
  }
`);

export const DELETE_HIRING_STEP = graphql(`
  mutation DeleteHiringStep($id: Int!) {
    deleteHiringStep(id: $id) {
      __typename
    }
  }
`);
