export interface Retrospective {
  id: string;
  createdTime: Date;
  lastEditedTime: Date;
  sprint: string;
  team: string;
  date: Date | null;
  planningStatus: string;
  url: string;
  // Relation fields for different phases
  setTheStageElements: string[];
  gatherDataElements: string[];
  generateInsightsElements: string[];
  decideWhatToDoElements: string[];
  closingElements: string[];
}
