export interface RetrospectiveElement {
  id: string;
  createdTime: Date;
  lastEditedTime: Date;
  theme: string;
  phase: string[];
  name: string;
  link: string;
  attendanceOptions: string[];
  usedInRetrospectiveIds: string[];
}
