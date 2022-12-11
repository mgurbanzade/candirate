import { Application } from '@gql/types/graphql';
import { DateTime } from 'luxon';

export type UIInteviewType = {
  id: string;
  uuid: string;
  application?: Application | null;
  description?: string | null;
  startDate: DateTime;
  title: string;
  startStr: string;
  duration: number;
  isNew?: boolean;
};

export type TimelineCellType = {
  id: string;
  hour: DateTime;
  hourStr: string;
};
