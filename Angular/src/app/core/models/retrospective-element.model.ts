import { DateTime } from 'luxon';

export interface RetrospectiveElement {
  id: string;
  createdTime: DateTime | null;
  lastEditedTime: DateTime | null;
  theme: string | null;
  phase: string[];
  name: string | null;
  link: string | null;
  attendanceOptions: string[];
  usedInRetrospectiveIds: string[];
}
