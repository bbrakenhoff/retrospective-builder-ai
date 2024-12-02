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
  date: null;
  url: string;
  phases: {
    setTheStage: RetrospectiveElementStub | null;
    gatherData: RetrospectiveElementStub | null;
    generateInsights: RetrospectiveElementStub | null;
    decideWhatToDo: RetrospectiveElementStub | null;
    closing: RetrospectiveElementStub | null;
  };
}

export class TestDataFactory {
  public static readonly setTheStageStub: Readonly<RetrospectiveElementStub> = {
    id: 'abc123',
    name: 'Increment by one',
    theme: null,
    link: 'https://www.funretrospectives.com/increment-by-one/',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['Set the Stage'],
  } as RetrospectiveElementStub;
  public static readonly gatherDataStub: Readonly<RetrospectiveElementStub> = {
    id: 'def123',
    name: 'Start, Stop, Continue',
    theme: null,
    link: 'https://www.betterup.com/blog/start-stop-continue',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['Gather Data'],
  };
  public static generateInsightsStub: Readonly<RetrospectiveElementStub> = {
    id: 'ghi123',
    name: 'The Worst We Could Do',
    theme: 'Reputation',
    link: 'https://retromat.org/en/?id=69',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['Generate Insights'],
  };
  public static readonly decideWhatToDoStub: Readonly<RetrospectiveElementStub> =
    {
      id: 'jkl123',
      name: 'Value vs. Effort Matrix',
      theme: null,
      link: 'https://www.savio.io/product-roadmap/value-vs-effort-matrix/',
      attendanceOptions: ['Online', 'Offline'],
      phase: ['Decide What To Do'],
    };
  public static readonly closingStub: Readonly<RetrospectiveElementStub> = {
    id: 'mno123',
    name: 'Pleased & Surprised',
    theme: null,
    link: 'https://retromat.org/en/?id=45',
    attendanceOptions: ['Online', 'Offline'],
    phase: ['Closing'],
  };

  public static readonly retrospectiveElementStubs: readonly RetrospectiveElementStub[] =
    Object.freeze([
      this.setTheStageStub,
      this.gatherDataStub,
      this.generateInsightsStub,
      this.decideWhatToDoStub,
      this.closingStub,
    ]);

  public static retrospective1Stub: Readonly<RetrospectiveStub> = {
    id: 'retro-1',
    sprint: 'Sprint 1',
    team: 'Team 1',
    date: null,
    url: 'https://example.com/retrospective/retro-1',
    phases: {
      setTheStage: this.setTheStageStub,
      gatherData: this.gatherDataStub,
      generateInsights: null,
      decideWhatToDo: null,
      closing: null,
    },
  };
  public static retrospective2Stub: Readonly<RetrospectiveStub> = {
    id: 'retro-2',
    sprint: 'Sprint 2',
    team: 'Team 2',
    date: null,
    url: 'https://example.com/retrospective/retro-2',
    phases: {
      setTheStage: null,
      gatherData: null,
      generateInsights: this.generateInsightsStub,
      decideWhatToDo: this.decideWhatToDoStub,
      closing: null,
    },
  };
  public static retrospective3Stub: Readonly<RetrospectiveStub> = {
    id: 'retro-3',
    sprint: 'Sprint 3',
    team: 'Team 3',
    date: null,
    url: 'https://example.com/retrospective/retro-3',
    phases: {
      setTheStage: null,
      gatherData: null,
      generateInsights: null,
      decideWhatToDo: null,
      closing: this.closingStub,
    },
  };
  public static readonly retrospectiveStubs: readonly RetrospectiveStub[] =
    Object.freeze([
      this.retrospective1Stub,
      this.retrospective2Stub,
      this.retrospective3Stub,
    ]);

  public static createRetrospectiveElements(
    stubs: RetrospectiveElementStub[] = [...this.retrospectiveElementStubs]
  ): RetrospectiveElement[] {
    return stubs.map(values => {
      return {
        ...values,
        createdTime: DateTime.now(),
        lastEditedTime: DateTime.now(),
        usedInRetrospectiveIds: [],
      };
    }) as RetrospectiveElement[];
  }

  public static createRetrospectives(
    stubs: RetrospectiveStub[] = [...this.retrospectiveStubs]
  ): Retrospective[] {
    return stubs.map(retrospectiveStub =>
      this.mapRetrospectiveStub(retrospectiveStub)
    ) as Retrospective[];
  }

  private static mapRetrospectiveStub(
    retrospectiveStub: RetrospectiveStub
  ): Retrospective {
    return {
      ...retrospectiveStub,
      createdTime: DateTime.now(),
      lastEditedTime: DateTime.now(),
      phases: {
        setTheStage: this.mapRetrospectiveElementStub(
          retrospectiveStub.phases.setTheStage
        ),
        gatherData: this.mapRetrospectiveElementStub(
          retrospectiveStub.phases.gatherData
        ),
        generateInsights: this.mapRetrospectiveElementStub(
          retrospectiveStub.phases.generateInsights
        ),
        decideWhatToDo: this.mapRetrospectiveElementStub(
          retrospectiveStub.phases.decideWhatToDo
        ),
        closing: this.mapRetrospectiveElementStub(
          retrospectiveStub.phases.closing
        ),
      },
    };
  }

  private static mapRetrospectiveElementStub(
    retrospectiveElementStub: RetrospectiveElementStub | null
  ): RetrospectiveElement | null {
    if (retrospectiveElementStub) {
      return {
        ...retrospectiveElementStub,
        createdTime: DateTime.now(),
        lastEditedTime: DateTime.now(),
        usedInRetrospectiveIds: [],
      };
    }

    return null;
  }
}
