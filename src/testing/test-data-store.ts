import { readFileSync } from 'fs';
import { Retrospective, RetrospectiveElement } from '../app/core/models';
import { DateTime } from 'luxon';

type AttendanceOption = 'Online' | 'Offline';

export interface RetrospectiveElementStub {
  id: string;
  name: string;
  theme: string | null;
  link: string | null;
  attendanceOptions: AttendanceOption[];
  phase: string[];
}

export interface RetrospectiveStub {
  id: string;
  sprint: string;
  team: string;
  date: DateTime | null;
  url: string;
  phases: {
    setTheStage: RetrospectiveElementStub | null;
    gatherData: RetrospectiveElementStub | null;
    generateInsights: RetrospectiveElementStub | null;
    decideWhatToDo: RetrospectiveElementStub | null;
    closing: RetrospectiveElementStub | null;
  };
  createdTime: DateTime;
  lastEditedTime: DateTime;
}

interface TestData {
  retrospectives: RetrospectiveStub[];
  retrospectiveElements: RetrospectiveElementStub[];
}

class TestDataStore {
  private testData: TestData;

  constructor(private testDataFile = 'src/testing/test-data.jsonc') {
    const testDataContent = readFileSync(this.testDataFile, 'utf8');
    this.testData = JSON.parse(testDataContent) as TestData;
  }

  getRetrospectiveElements(): RetrospectiveElement[] {
    return this.testData.retrospectiveElements.map(stub =>
      this.mapRetrospectiveElementStubToModel(stub)
    );
  }

  private mapRetrospectiveElementStubToModel(
    stub: RetrospectiveElementStub
  ): RetrospectiveElement {
    return {
      id: stub.id,
      name: stub.name,
      theme: stub.theme,
      link: stub.link,
      attendanceOptions: stub.attendanceOptions,
      phase: stub.phase,
      createdTime: DateTime.now(),
      lastEditedTime: DateTime.now(),
      usedInRetrospectiveIds: [],
    };
  }

  findRetrospectiveElement(
    id?: string,
    name?: string,
    theme?: string,
    attendanceOption?: string,
    phase?: string,
    retrospectiveId?: string
  ): RetrospectiveElement | null {
    return (
      this.getRetrospectiveElements().find(element => {
        const idMatch = id === undefined || element.id === id;
        const nameMatch = name === undefined || element.name === name;
        const themeMatch = theme === undefined || element.theme === theme;
        const attendanceOptionMatch =
          attendanceOption === undefined ||
          element.attendanceOptions.includes(attendanceOption);
        const phaseMatch = phase === undefined || element.phase.includes(phase);
        const retrospectiveIdMatch =
          retrospectiveId === undefined ||
          element.usedInRetrospectiveIds.includes(retrospectiveId);

        return (
          idMatch &&
          nameMatch &&
          themeMatch &&
          attendanceOptionMatch &&
          phaseMatch &&
          retrospectiveIdMatch
        );
      }) ?? null
    );
  }

  getRetrospectives(): Retrospective[] {
    return this.testData.retrospectives.map(stub =>
      this.mapRetrospectiveStubToModel(stub)
    );
  }

  private mapRetrospectiveStubToModel(stub: RetrospectiveStub): Retrospective {
    return {
      id: stub.id,
      sprint: stub.sprint,
      team: stub.team,
      date: stub.date,
      url: stub.url,
      createdTime: stub.createdTime,
      lastEditedTime: stub.lastEditedTime,
      phases: {
        setTheStage:
          stub.phases.setTheStage !== null
            ? this.mapRetrospectiveElementStubToModel(stub.phases.setTheStage)
            : null,
        gatherData:
          stub.phases.gatherData !== null
            ? this.mapRetrospectiveElementStubToModel(stub.phases.gatherData)
            : null,
        generateInsights:
          stub.phases.generateInsights !== null
            ? this.mapRetrospectiveElementStubToModel(
                stub.phases.generateInsights
              )
            : null,
        decideWhatToDo:
          stub.phases.decideWhatToDo !== null
            ? this.mapRetrospectiveElementStubToModel(
                stub.phases.decideWhatToDo
              )
            : null,
        closing:
          stub.phases.closing !== null
            ? this.mapRetrospectiveElementStubToModel(stub.phases.closing)
            : null,
      },
    };
  }
}

export const testDataStore = new TestDataStore();
