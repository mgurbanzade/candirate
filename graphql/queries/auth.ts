import { graphql } from '../types';

export const REFRESH = graphql(`
  query Refresh {
    refresh {
      user {
        firstname
        email
        type
      }
    }
  }
`);
