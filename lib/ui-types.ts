import { Application } from '@gql/types/graphql';
import { DateTime } from 'luxon';

export type UIInteviewType = {
  id: string;
  application?: Application | null;
  description?: string | null;
  startDate: DateTime;
  title: string;
  startStr: string;
  duration: number;
  uuid?: string;
  isNew?: boolean;
};

export type TimelineCellType = {
  id: string;
  hour: DateTime;
  hourStr: string;
};
