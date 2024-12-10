import { RetrospectiveElementStub } from './retrospective-element.stub';

export interface RetrospectiveStub {
  id: string;
  sprint: string;
  team: string;
  date: string | null;
  phases: {
    setTheStage: RetrospectiveElementStub | string | null;
    gatherData: RetrospectiveElementStub | string | null;
    generateInsights: RetrospectiveElementStub | string | null;
    decideWhatToDo: RetrospectiveElementStub | string | null;
    closing: RetrospectiveElementStub | string | null;
  };
  createdTime: string;
  lastEditedTime: string;
}
