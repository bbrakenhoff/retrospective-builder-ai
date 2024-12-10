import { Retrospective, RetrospectiveElement } from '../app/core/models';
import { DateTime } from 'luxon';
import { RetrospectiveStub } from './retrospective.stub';
import { RetrospectiveElementStub } from './retrospective-element.stub';
import { testRetrospectiveElements } from './data/retrospective-elements';
import { testRetrospectives } from './data/retrospectives';
import {
  NotionPage,
  NotionQueryResponse,
  NotionRetrospectiveProperties,
} from '../app/core/types';

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
        name: null,
        theme: null,
        link: null,
        attendanceOptions: [],
        phase: [],
        createdTime: null,
        lastEditedTime: null,
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

  getRetrospectives(options?: {
    startIndex?: number;
    endIndex?: number;
    full?: boolean;
  }): Retrospective[] {
    if (!options) {
      options = {};
    }
    options.startIndex = options.startIndex ?? 0;
    options.endIndex =
      options.endIndex ?? this.testData.retrospectives.refOnly.length;
    options.full = options.full ?? false;

    const retrospectives = options.full
      ? this.testData.retrospectives.full
      : this.testData.retrospectives.refOnly;
    return retrospectives
      .slice(options.startIndex, options.endIndex)
      .map(stub => this.mapRetrospectiveStubToModel(stub));
  }

  private mapRetrospectiveStubToModel(stub: RetrospectiveStub): Retrospective {
    return {
      id: stub.id,
      sprint: stub.sprint,
      team: stub.team,
      date: stub.date !== null ? DateTime.fromISO(stub.date) : null,
      // url: stub.url,
      createdTime: DateTime.fromISO(stub.createdTime),
      lastEditedTime: DateTime.fromISO(stub.lastEditedTime),
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
      this.mapRetrospectiveElementStubToNotionPage(stub)
    );
    return { results };
  }

  private mapRetrospectiveElementStubToNotionPage(
    stub: RetrospectiveElementStub
  ): NotionPage {
    return {
      id: stub.id,
      created_time: DateTime.now().toISO(),
      last_edited_time: DateTime.now().toISO(),
      url: `http://test.notion/${stub.id}`,
      properties: {
        Theme: stub.theme ? { select: { name: stub.theme } } : undefined,
        Phase: stub.phase
          ? { multi_select: stub.phase.map(phase => ({ name: phase })) }
          : [],
        Name: stub.name ? { title: [{ plain_text: stub.name }] } : undefined,
        Link: stub.link ? { rich_text: [{ plain_text: stub.link }] } : null,
        'Attendance options': stub.attendanceOptions
          ? {
              multi_select: stub.attendanceOptions.map(option => ({
                name: option,
              })),
            }
          : [],
      },
    };
  }

  getRetrospectivesQueryResponse(): NotionQueryResponse {
    const results = this.testData.retrospectives.refOnly.map(stub =>
      this.mapRetrospectiveStubToNotionPage(stub)
    );
    return { results };
  }

  private mapRetrospectiveStubToNotionPage(
    stub: RetrospectiveStub
  ): NotionPage {
    return {
      id: stub.id,
      created_time: stub.createdTime,
      last_edited_time: stub.lastEditedTime,
      url: `http://test.notion/${stub.id}`,
      properties: this.mapRetrospectiveStubToNotionProperties(stub),
    };
  }
  private mapRetrospectiveStubToNotionProperties(
    stub: RetrospectiveStub
  ): NotionRetrospectiveProperties {
    return {
      // Map properties from RetrospectiveStub to NotionPage properties
      Sprint: { title: [{ plain_text: stub.sprint }] },
      Team: { select: { name: stub.team } },
      Date: stub.date ? { date: { start: stub.date } } : undefined,
      'Set the Stage': {
        relation: stub.phases.setTheStage
          ? [{ id: stub.phases.setTheStage as string }]
          : [],
      },
      'Gather data': {
        relation: stub.phases.gatherData
          ? [{ id: stub.phases.gatherData as string }]
          : [],
      },
      'Generate insights': {
        relation: stub.phases.generateInsights
          ? [{ id: stub.phases.generateInsights as string }]
          : [],
      },
      'Decide what to do': {
        relation: stub.phases.decideWhatToDo
          ? [{ id: stub.phases.decideWhatToDo as string }]
          : [],
      },
      Closing: {
        relation: stub.phases.closing
          ? [{ id: stub.phases.closing as string }]
          : [],
      },
    };
  }
}

export const testDataStore = new TestDataStore();
