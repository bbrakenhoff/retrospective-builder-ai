import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { Retrospective } from '../models';
import { NotionService } from './notion.service';
import { RetrospectiveService } from './retrospective.service';
import { testDataStore } from '../../../testing/test-data-store';

describe('RetrospectiveService', () => {
  const testData = {
    initialRetrospectivesRefOnly: testDataStore.getRetrospectives({
      startIndex: 0,
      endIndex: 4,
    }),
    initialRetrospectivesFull: testDataStore.getRetrospectives({
      startIndex: 0,
      endIndex: 4,
      full: true,
    }),
    reloadedRetrospectivesRefOnly: testDataStore.getRetrospectives({
      startIndex: 4,
    }),
    reloadedRetrospectivesFull: testDataStore.getRetrospectives({
      startIndex: 4,
      full: true,
    }),
    retrospectiveElements: testDataStore.getRetrospectiveElements(),
  };

  let testScheduler: TestScheduler;

  let notionServiceSpy: jasmine.SpyObj<NotionService>;

  let service: RetrospectiveService;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    notionServiceSpy = jasmine.createSpyObj('NotionService', [
      'getRetrospectives$',
      'getRetrospectiveElements$',
    ]);
    notionServiceSpy.getRetrospectives$.and.returnValues(
      of(testData.initialRetrospectivesRefOnly),
      of(testData.reloadedRetrospectivesRefOnly)
    );
    notionServiceSpy.getRetrospectiveElements$.and.returnValue(
      of(testData.retrospectiveElements)
    );

    TestBed.configureTestingModule({
      providers: [{ provide: NotionService, useValue: notionServiceSpy }],
    });
    service = TestBed.inject(RetrospectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('all$()', () => {
    it('should load retrospectives on initial load', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        expectObservable(service.all$()).toEqual(
          cold('1', { 1: testData.initialRetrospectivesFull })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilc)', { i: false, l: true, c: false })
        );
      });
    });
  });

  describe('reload()', () => {
    it('should reload retrospectives when reload is called where force is true', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        const replayResults$ = new ReplaySubject<Retrospective[]>();
        service.all$().subscribe({
          next: results => replayResults$.next(results),
        });

        service.reload(true);

        expectObservable(replayResults$).toEqual(
          cold('(12)', {
            1: testData.initialRetrospectivesFull,
            2: testData.reloadedRetrospectivesFull,
          })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilcrf)', { i: false, l: true, c: false, r: true, f: false })
        );
      });
    });

    it('should not reload retrospectives when reload is called where force is false and cache not empty', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        const replayResults$ = new ReplaySubject<Retrospective[]>();
        service.all$().subscribe({
          next: results => replayResults$.next(results),
        });

        service.reload();

        expectObservable(replayResults$).toEqual(
          cold('1', { 1: testData.initialRetrospectivesFull })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilc)', { i: false, l: true, c: false })
        );

        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(1);
      });
    });

    it('should not reload when already loading', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        notionServiceSpy.getRetrospectives$.and.returnValues(
          cold('(---0)', { 0: [] }),
          cold('(---1)', { 1: testData.reloadedRetrospectivesRefOnly })
        );

        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        service.reload();
        service.reload();

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilc)', { i: false, l: true, c: false })
        );

        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(1);
      });
    });

    it('should reload retrospectives when reload is called where force is false and cache is empty', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        notionServiceSpy.getRetrospectives$.and.returnValues(
          of([]),
          of(testData.reloadedRetrospectivesRefOnly)
        );

        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        const replayResults$ = new ReplaySubject<Retrospective[]>();
        service.all$().subscribe({
          next: results => replayResults$.next(results),
        });

        service.reload();

        expectObservable(replayResults$).toEqual(
          cold('(12)', { 1: [], 2: testData.reloadedRetrospectivesFull })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilcrf)', { i: false, l: true, c: false, r: true, f: false })
        );

        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(2);
      });
    });
  });
});
