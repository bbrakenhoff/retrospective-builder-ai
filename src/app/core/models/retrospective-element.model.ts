import { DateTime } from 'luxon';

export interface RetrospectiveElement {
  id: string;
  createdTime: DateTime | null;
  lastEditedTime: DateTime | null;
  theme: string;
  phase: string[];
  name: string;
  link: string;
  attendanceOptions: string[];
  usedInRetrospectiveIds: string[];
}
