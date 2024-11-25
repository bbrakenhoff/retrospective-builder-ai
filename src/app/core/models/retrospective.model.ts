import { DateTime } from 'luxon';

export interface Retrospective {
  id: string;
  createdTime: DateTime;
  lastEditedTime: DateTime;
  sprint: string;
  team: string;
  date: DateTime | null;
  url: string;
  // Relation fields for different phases
  setTheStageElements: string[];
  gatherDataElements: string[];
  generateInsightsElements: string[];
  decideWhatToDoElements: string[];
  closingElements: string[];
}
