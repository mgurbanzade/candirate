import { graphql } from '../types';

export const CREATE_POSITION_MUTATION = graphql(`
  mutation CreatePosition($createPositionInput: CreatePositionInput!) {
    createPosition(createPositionInput: $createPositionInput) {
      title
      description
    }
  }
`);

export const UPDATE_POSITION_MUTATION = graphql(`
  mutation UpdatePosition(
    $id: Int!
    $updatePositionInput: UpdatePositionInput!
  ) {
    updatePosition(id: $id, updatePositionInput: $updatePositionInput) {
      title
      description
    }
  }
`);
