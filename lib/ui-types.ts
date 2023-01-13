import { Application } from '@gql/types/graphql';
import { DateTime } from 'luxon';

export enum TimelineEventTypes {
  INTERVIEW = 'interview',
  EVENT = 'event',
  NEW_SLOT = 'new slot',
}

export type UITimelineEventType = {
  id: string;
  title: string;
  startStr: string;
  endStr?: string;
  duration: number;
  startDate: DateTime;
  endDate: DateTime;
  applicationId?: number;
  hiringStepId?: number;
  type: TimelineEventTypes;
  application?: Application | null;
  description?: string | null;
  uuid?: string;
};

export type UIQuestionType = {
  id: number;
  title: string;
  points: number;
  isNew: boolean;
};

export type TimelineCellType = {
  id: string;
  hour: DateTime;
  hourStr: string;
  isFreeTimeslot: boolean;
};

export type MappedTimeslotType = {
  startDate: DateTime;
  endDate: DateTime;
};
