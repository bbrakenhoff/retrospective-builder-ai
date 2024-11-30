import { Retrospective, RetrospectiveElement } from '../app/core/models';
import { DateTime } from 'luxon';
import { NotionPage } from '../app/core/types';

type AttendanceOption = 'Online' | 'Offline';

export interface RetrospectiveElementStub {
  id: string;
  name: string;
  theme: string | null;
  link: string | null;
  attendanceOptions: AttendanceOption[];
  phase: string[];
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

  public static readonly allStubs: readonly RetrospectiveElementStub[] =
    Object.freeze([
      this.setTheStageStub,
      this.gatherDataStub,
      this.generateInsightsStub,
      this.decideWhatToDoStub,
      this.closingStub,
    ]);

  public static createRetrospectiveElements(
    stubs: RetrospectiveElementStub[] = [...this.allStubs]
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
}
