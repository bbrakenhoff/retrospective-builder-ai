export interface RetrospectiveElement {
  id: string;
  createdTime: Date;
  lastEditedTime: Date;
  theme: string;
  phase: string;
  name: string;
  link: string;
  attendanceOptions: string[];
  usageCount: number;
  latestUseDate: Date | null;
  latestUseTeam: string | null;
  usedInTeams: string[];
  usedOnDates: Date[];
} 