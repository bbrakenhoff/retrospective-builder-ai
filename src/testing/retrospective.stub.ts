import { DateTime } from 'luxon';
import { RetrospectiveElementStub } from './retrospective-element.stub';

export interface RetrospectiveStub {
  id: string;
  sprint: string;
  team: string;
  date: string | null;
  url: string;
  phases: {
    setTheStage: RetrospectiveElementStub | null;
    gatherData: RetrospectiveElementStub | null;
    generateInsights: RetrospectiveElementStub | null;
    decideWhatToDo: RetrospectiveElementStub | null;
    closing: RetrospectiveElementStub | null;
  };
  createdTime: string;
  lastEditedTime: string;
}
