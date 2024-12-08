export type AttendanceOption = 'Online' | 'Offline';

export interface RetrospectiveElementStub {
  id: string;
  name: string;
  theme: string | null;
  link: string | null;
  attendanceOptions: AttendanceOption[];
  phase: string[];
  instruction: string;
}
