import { graphql } from '../types';

export const CREATE_POSITION_MUTATION = graphql(`
  mutation CreatePosition($createPositionInput: CreatePositionInput!) {
    createPosition(createPositionInput: $createPositionInput) {
      title
      description
    }
  }
`);
