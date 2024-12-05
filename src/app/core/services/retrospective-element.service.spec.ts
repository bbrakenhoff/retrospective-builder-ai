import { TestBed } from '@angular/core/testing';

import { RetrospectiveElementService } from './retrospective-element.service';
import { of, ReplaySubject } from 'rxjs';
import { NotionService } from './notion.service';
import { TestDataFactory } from '../../../testing/test-data-factory';
import { RetrospectiveElement } from '../models';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

fdescribe('RetrospectiveElementService', () => {
  const testData = TestDataFactory.createRetrospectiveElements();

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
    notionServiceSpy.getRetrospectiveElements$.and.returnValue(of(testData));
    expect(testData).toBe(testData);

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

        expectObservable(service.all$()).toEqual(cold('r', { r: testData }));

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilc)', { i: false, l: true, c: false })
        );
      });
    });
  });

  describe('reload()', () => {
    it('should reload retrospective elements when reload is called where force is true', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const initialTestData = testData.slice(0, 2);
        const reloadTestData = testData.slice(2);

        notionServiceSpy.getRetrospectiveElements$.and.returnValues(
          of(initialTestData),
          of(reloadTestData)
        );

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
          cold('(lr)', { l: initialTestData, r: reloadTestData })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilcrf)', { i: false, l: true, c: false, r: true, f: false })
        );
      });
    });

    it('should not reload retrospective elements when reload is called where force is false and cache not empty', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const initialTestData = testData.slice(0, 2);
        const reloadTestData = testData.slice(2);

        notionServiceSpy.getRetrospectiveElements$.and.returnValues(
          of(initialTestData),
          of(reloadTestData)
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
          cold('l', { l: initialTestData })
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
        const initialTestData: RetrospectiveElement[] = [];
        const reloadTestData = testData;

        notionServiceSpy.getRetrospectiveElements$.and.returnValues(
          cold('(---a)', { a: initialTestData }),
          cold('(---b)', { b: reloadTestData })
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
        const initialTestData: RetrospectiveElement[] = [];
        const reloadTestData = testData;

        notionServiceSpy.getRetrospectiveElements$.and.returnValues(
          of(initialTestData),
          of(reloadTestData)
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
          cold('(lr)', { l: initialTestData, r: reloadTestData })
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
