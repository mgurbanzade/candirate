import { graphql } from '../types';

export const GET_CALENDAR_DAY_TIMESLOTS = graphql(`
  query getCalendarDayTimeslots($where: TimeslotsWhereInput!) {
    getCalendarDayTimeslots(where: $where) {
      id
      startsAt
      endsAt
    }
  }
`);
