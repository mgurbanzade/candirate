import { graphql } from '../types';

export const SET_NOTIFICATION_READ = graphql(`
  mutation SetNotificationRead($id: Int!) {
    setNotificationRead(id: $id) {
      id
      isRead
    }
  }
`);
