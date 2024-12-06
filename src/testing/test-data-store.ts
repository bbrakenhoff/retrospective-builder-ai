import { Retrospective, RetrospectiveElement } from '../app/core/models';
import { DateTime } from 'luxon';
import { RetrospectiveStub } from './retrospective.stub';
import { RetrospectiveElementStub } from './retrospective-element.stub';
import { testRetrospectiveElements } from './data/retrospective-elements';
import { testRetrospectives } from './data/retrospectives';

interface TestData {
  retrospectives: RetrospectiveStub[];
  retrospectiveElements: RetrospectiveElementStub[];
}

class TestDataStore {
  private static readonly TEST_RETROSPECTIVE_ELEMENTS_JSONC =
    'src/testing/retrosective-elements.jsonc';
  private static readonly TEST_RETROSPECTIVE_JSONC =
    'src/testing/retrosectives.jsonc';

  private readonly testData: TestData;

  constructor() {
    this.testData = {
      retrospectiveElements: testRetrospectiveElements,
      retrospectives: testRetrospectives,
    };
  }

  getRetrospectiveElements(
    startIndex = 0,
    endIndex = this.testData.retrospectiveElements.length - 1
  ): RetrospectiveElement[] {
    return this.testData.retrospectiveElements
      .slice(startIndex, endIndex)
      .map(stub => this.mapRetrospectiveElementStubToModel(stub));
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
      date: stub.date ? DateTime.fromISO(stub.date, { zone: 'utc' }) : null,
      url: stub.url,
      createdTime: DateTime.fromISO(stub.createdTime, { zone: 'utc' }),
      lastEditedTime: DateTime.fromISO(stub.lastEditedTime, { zone: 'utc' }),
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
