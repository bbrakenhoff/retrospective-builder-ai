import { Retrospective, RetrospectiveElement } from '../app/core/models';
import { DateTime } from 'luxon';
import { RetrospectiveStub } from './retrospective.stub';
import { RetrospectiveElementStub } from './retrospective-element.stub';
import { testRetrospectiveElements } from './data/retrospective-elements';
import { testRetrospectives } from './data/retrospectives';
import { NotionPage, NotionQueryResponse } from '../app/core/types';

interface TestData {
  retrospectives: { full: RetrospectiveStub[]; refOnly: RetrospectiveStub[] };
  retrospectiveElements: RetrospectiveElementStub[];
}

class TestDataStore {
  private readonly testData: TestData;

  constructor() {
    this.testData = {
      retrospectiveElements: testRetrospectiveElements,
      retrospectives: testRetrospectives,
    };
  }

  getRetrospectiveElements(
    startIndex = 0,
    endIndex = this.testData.retrospectiveElements.length
  ): RetrospectiveElement[] {
    return this.testData.retrospectiveElements
      .slice(startIndex, endIndex)
      .map(stub => this.mapRetrospectiveElementStubToModel(stub));
  }

  private mapRetrospectiveElementStubToModel(
    stub: RetrospectiveElementStub | string
  ): RetrospectiveElement {
    if (typeof stub === 'string') {
      return {
        id: stub,
        name: '',
        theme: '',
        link: '',
        attendanceOptions: [],
        phase: [],
        createdTime: DateTime.now(),
        lastEditedTime: DateTime.now(),
        usedInRetrospectiveIds: [],
      };
    } else {
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
  }

  getRetrospectives({
    startIndex = 0,
    endIndex = this.testData.retrospectiveElements.length / 2 - 1,
    full = false,
  }): Retrospective[] {
    const retrospectives = full
      ? this.testData.retrospectives.full
      : this.testData.retrospectives.refOnly;
    return retrospectives
      .slice(startIndex, endIndex)
      .map(stub => this.mapRetrospectiveStubToModel(stub));
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

  getRetrospectiveElementsQueryResponse(): NotionQueryResponse {
    const results = this.testData.retrospectiveElements.map(stub =>
      this.mapRetrospectiveElementToNotionPage(stub)
    );
    return { results };
  }

  private mapRetrospectiveElementToNotionPage(stub: RetrospectiveElementStub) {
    return {
      id: stub.id,
      created_time: DateTime.now().toISO(),
      last_edited_time: DateTime.now().toISO(),
      url: `http://test.notion/${stub.id}`,
      properties: {
        Theme: stub.theme ? { select: { name: stub.theme } } : undefined,
        Phase: stub.phase ? { multi_select: stub.phase } : undefined,
        Name: stub.name
          ? { title: [{ text: { content: stub.name } }] }
          : undefined,
        Link: stub.link
          ? { rich_text: [{ text: { content: stub.link } }] }
          : undefined,
        'Attendance options': stub.attendanceOptions
          ? { multi_select: stub.attendanceOptions }
          : undefined,
      },
    };
  }
}

export const testDataStore = new TestDataStore();
