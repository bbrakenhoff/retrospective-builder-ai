import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { testDataStore } from '../../../test/test-data-store';
import { RetrospectiveElement } from '../models';
import { NotionService } from './notion.service';
import { RetrospectiveElementService } from './retrospective-element.service';

describe('RetrospectiveElementService', () => {
  const testData = {
    initialRetrospectiveElements: testDataStore.getRetrospectiveElements(0, 10),
    reloadRetrospectiveElements: testDataStore.getRetrospectiveElements(10),
  };

  let testScheduler: TestScheduler;

  let notionServiceSpy: jasmine.SpyObj<NotionService>;

  let service: RetrospectiveElementService;

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    notionServiceSpy = jasmine.createSpyObj('NotionService', [
      'getRetrospectiveElements$',
    ]);
    notionServiceSpy.getRetrospectiveElements$.and.returnValues(
      of(testData.initialRetrospectiveElements),
      of(testData.reloadRetrospectiveElements)
    );

    TestBed.configureTestingModule({
      providers: [{ provide: NotionService, useValue: notionServiceSpy }],
    });
    service = TestBed.inject(RetrospectiveElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('all$()', () => {
    it('should load retrospective elements on initial load', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        expectObservable(service.all$()).toEqual(
          cold('1', { 1: testData.initialRetrospectiveElements })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilc)', { i: false, l: true, c: false })
        );
      });
    });
  });

  describe('reload()', () => {
    it('should reload retrospective elements when reload is called where force is true', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        const replayResults$ = new ReplaySubject<RetrospectiveElement[]>();
        service.all$().subscribe({
          next: results => replayResults$.next(results),
        });

        service.reload(true);

        expectObservable(replayResults$).toEqual(
          cold('(12)', {
            1: testData.initialRetrospectiveElements,
            2: testData.reloadRetrospectiveElements,
          })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilcrf)', { i: false, l: true, c: false, r: true, f: false })
        );
      });
    });

    it('should not reload retrospective elements when reload is called where force is false and cache not empty', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        const replayResults$ = new ReplaySubject<RetrospectiveElement[]>();
        service.all$().subscribe({
          next: results => replayResults$.next(results),
        });

        service.reload();

        expectObservable(replayResults$).toEqual(
          cold('1', { 1: testData.initialRetrospectiveElements })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilc)', { i: false, l: true, c: false })
        );

        expect(
          notionServiceSpy.getRetrospectiveElements$
        ).toHaveBeenCalledTimes(1);
      });
    });

    it('should not reload when already loading', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        notionServiceSpy.getRetrospectiveElements$.and.returnValues(
          cold('(---1)', { 1: [] }),
          cold('(---2)', { 2: testData.reloadRetrospectiveElements })
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

        expect(
          notionServiceSpy.getRetrospectiveElements$
        ).toHaveBeenCalledTimes(1);
      });
    });

    it('should reload retrospective elements when reload is called where force is false and cache is empty', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        notionServiceSpy.getRetrospectiveElements$.and.returnValues(
          of([]),
          of(testData.reloadRetrospectiveElements)
        );

        const replayIsLoading$$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$$.next(isLoading),
        });

        const replayResults$ = new ReplaySubject<RetrospectiveElement[]>();
        service.all$().subscribe({
          next: results => replayResults$.next(results),
        });

        service.reload();

        expectObservable(replayResults$).toEqual(
          cold('(12)', { 1: [], 2: testData.reloadRetrospectiveElements })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilcrf)', { i: false, l: true, c: false, r: true, f: false })
        );

        expect(
          notionServiceSpy.getRetrospectiveElements$
        ).toHaveBeenCalledTimes(2);
      });
    });
  });
});
