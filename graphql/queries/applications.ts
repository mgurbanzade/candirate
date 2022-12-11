import { graphql } from '../types';

export const GET_APPLICATION = graphql(`
  query GetApplication($uuid: String!) {
    getApplication(uuid: $uuid) {
      id
      uuid
      position {
        id
        title
      }
      candidate {
        id
        positionTitle
        user {
          firstname
        }
      }
    }
  }
`);
