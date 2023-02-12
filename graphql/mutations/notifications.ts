import { graphql } from '../types';

export const SET_NOTIFICATION_READ = graphql(`
  mutation SetNotificationRead($id: Int!, $recipientId: Int!) {
    setNotificationRead(id: $id, recipientId: $recipientId) {
      id
      isRead
    }
  }
`);
