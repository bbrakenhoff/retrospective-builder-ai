import { NotionService } from './notion.service';
import { TestBed } from '@angular/core/testing';
import { RetrospectiveElementAdapter } from '../adapters/retrospective-element.adapter';
import { RetrospectiveAdapter } from '../adapters/retrospective.adapter';
import { Client } from '@notionhq/client';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { testDataStore } from '../../../test/test-data-store';
import { environment } from '../../../environments/environment.test';
import { of } from 'rxjs';

describe('NotionService', () => {
  const testData = {
    elementsQueryResponse:
      testDataStore.getRetrospectiveElementsQueryResponse(),
    elements: testDataStore.getRetrospectiveElements(),
    retrospectivesQueryResponse: testDataStore.getRetrospectivesQueryResponse(),
    retrospectives: testDataStore.getRetrospectives(),
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
    notionDatabasesSpy.query.and.callFake(({ database_id }) => {
      if (database_id === environment.notion.databases.retrospectiveElements) {
        return of(testData.elementsQueryResponse);
      } else if (database_id === environment.notion.databases.retrospectives) {
        return of(testData.retrospectivesQueryResponse);
      }

      return 'wrong database id';
    });
    notion = jasmine.createSpyObj<Client>('Client', [], {
      databases: notionDatabasesSpy,
    });
    retrospectiveElementAdapterSpy =
      jasmine.createSpyObj<RetrospectiveElementAdapter>(
        'RetrospectiveElementAdapter',
        ['mapNotionResponseToRetrospectives']
      );
    retrospectiveElementAdapterSpy.mapNotionResponseToRetrospectives.and.returnValues(
      testData.elements
    );
    retrospectiveAdapterSpy = jasmine.createSpyObj<RetrospectiveAdapter>(
      'RetrospectiveAdapter',
      ['mapNotionResponseToRetrospectives']
    );
    retrospectiveAdapterSpy.mapNotionResponseToRetrospectives.and.returnValue(
      testData.retrospectives
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
      testScheduler.run(({ expectObservable, cold, flush }) => {
        expectObservable(service.getRetrospectiveElements$()).toEqual(
          cold('(1|)', { 1: testData.elements })
        );

        flush();

        expect(notionDatabasesSpy.query).toHaveBeenCalledTimes(1);
        expect(notionDatabasesSpy.query).toHaveBeenCalledWith({
          database_id: environment.notion.databases.retrospectiveElements,
        });
        expect(
          retrospectiveElementAdapterSpy.mapNotionResponseToRetrospectives
        ).toHaveBeenCalledTimes(1);
        expect(
          retrospectiveElementAdapterSpy.mapNotionResponseToRetrospectives
        ).toHaveBeenCalledWith(testData.elementsQueryResponse);
      });
    });
  });

  describe('getRetrospectives$()', () => {
    it('should get retrospectives', () => {
      testScheduler.run(({ expectObservable, cold, flush }) => {
        expectObservable(service.getRetrospectives$()).toEqual(
          cold('(1|)', { 1: testData.retrospectives })
        );

        flush();

        expect(notionDatabasesSpy.query).toHaveBeenCalledTimes(1);
        expect(notionDatabasesSpy.query).toHaveBeenCalledWith({
          database_id: environment.notion.databases.retrospectives,
        });
        expect(
          retrospectiveAdapterSpy.mapNotionResponseToRetrospectives
        ).toHaveBeenCalledTimes(1);
        expect(
          retrospectiveAdapterSpy.mapNotionResponseToRetrospectives
        ).toHaveBeenCalledWith(testData.retrospectivesQueryResponse);
      });
    });
  });
});
