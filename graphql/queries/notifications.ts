import { graphql } from '../types';

export const GET_NOTIFICATIONS = graphql(`
  query GetNotifications($where: NotificationWhereUniqueInput!) {
    getNotifications(where: $where) {
      id
      title
      body
      isRead
      redirectPath
      recipientId
    }
  }
`);
