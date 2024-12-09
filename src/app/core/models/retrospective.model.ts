import { DateTime } from 'luxon';
import { RetrospectiveElement } from './retrospective-element.model';

export interface Retrospective {
  id: string;
  createdTime: DateTime;
  lastEditedTime: DateTime;
  sprint: string | null;
  team: string | null;
  date: DateTime | null;
  url: string;

  // Relation fields for different phases
  phases: {
    setTheStage: RetrospectiveElement | null;
    gatherData: RetrospectiveElement | null;
    generateInsights: RetrospectiveElement | null;
    decideWhatToDo: RetrospectiveElement | null;
    closing: RetrospectiveElement | null;
  };
}
