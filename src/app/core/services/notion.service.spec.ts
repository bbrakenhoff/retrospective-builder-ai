import { NotionService } from './notion.service';
import { TestBed } from '@angular/core/testing';
import { RetrospectiveElementAdapter } from '../adapters/retrospective-element.adapter';
import { RetrospectiveAdapter } from '../adapters/retrospective.adapter';
import { Client } from '@notionhq/client';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { testDataStore } from '../../../testing/test-data-store';
import { environment } from '../../../environments/environment.test';
import { of } from 'rxjs';

fdescribe('NotionService', () => {
  const testData = {
    elementsQueryResponse:
      testDataStore.getRetrospectiveElementsQueryResponse(),
    elements: testDataStore.getRetrospectiveElements(),
  };

  let notionDatabasesSpy: any;
  let notion: jasmine.SpyObj<Client>;
  let retrospectiveElementAdapterSpy: jasmine.SpyObj<RetrospectiveElementAdapter>;
  let retrospectiveAdapterSpy: jasmine.SpyObj<RetrospectiveAdapter>;

  let testScheduler: TestScheduler;

  let service: NotionService;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    notionDatabasesSpy = jasmine.createSpyObj<any>('databases', ['query']);
    // @ts-ignore

    notion = jasmine.createSpyObj<Client>('Client', [], {
      databases: notionDatabasesSpy,
    });
    retrospectiveElementAdapterSpy =
      jasmine.createSpyObj<RetrospectiveElementAdapter>(
        'RetrospectiveElementAdapter',
        ['fromNotionResponse']
      );
    retrospectiveElementAdapterSpy.fromNotionResponse.and.callFake(() => {
      console.log(`🩷Bijoya - notion.service.spec.ts > in de spy`);
      return testData.elements;
    });
    retrospectiveAdapterSpy = jasmine.createSpyObj<RetrospectiveAdapter>(
      'RetrospectiveAdapter',
      ['mapNotionResponseToRetrospectives']
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: Client, useValue: notion },
        {
          provide: RetrospectiveElementAdapter,
          useValue: retrospectiveElementAdapterSpy,
        },
        { provide: RetrospectiveAdapter, useValue: retrospectiveAdapterSpy },
      ],
    });
    service = TestBed.inject(NotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRetrospectiveElements$()', () => {
    it('should get retrospective elements', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        // @ts-ignore
        notionDatabasesSpy.query.and.callFake(({ database_id }) => {
          if (
            database_id === environment.notion.databases.retrospectiveElements
          ) {
            return of(testData.elementsQueryResponse);
          }

          return 'wrong database id';
        });
        expectObservable(service.getRetrospectiveElements$()).toEqual(
          cold('(r|)', { r: testData.elements })
        );
      });
    });
  });
});
