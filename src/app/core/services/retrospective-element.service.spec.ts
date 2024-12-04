import { TestBed } from '@angular/core/testing';

import { RetrospectiveElementService } from './retrospective-element.service';
import { Observer, of, ReplaySubject } from 'rxjs';
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
    fit('should load retrospective elements on initial load', () => {
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

    fit('should reload retrospective elements when reload is called where force is true', () => {
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

    fit('should reload retrospectiveelements when reload is called where force is false and cache not empty', () => {
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
      });
    });
    xit('should reload retrospectiveelements when reload is called where force is false and cache not empty', done => {
      const initialTestData = testData.slice(0, 2);
      const reloadTestData = testData.slice(2);

      notionServiceSpy.getRetrospectiveElements$.and.returnValues(
        of(initialTestData),
        of(reloadTestData)
      );
      let observerCount = 0;
      let results: RetrospectiveElement[] = [];
      const observer: Observer<RetrospectiveElement[]> = {
        error: done.fail,
        complete: done,
        next: elements => {
          observerCount++;
          results = elements;
        },
      };

      service.all$().subscribe(observer);
      service.reload();

      setTimeout(() => {
        expect(observerCount).toBe(1);
        expect(
          notionServiceSpy.getRetrospectiveElements$
        ).toHaveBeenCalledTimes(1);
        expect(results).toEqual(initialTestData);
        done();
      }, 1000);
    });

    xit('should share the same observable instance among multiple subscribers', done => {
      notionServiceSpy.getRetrospectiveElements$.and.returnValue(of(testData));

      service.all$().subscribe({
        next: elements => {
          expect(elements).toEqual(testData);
        },
      });

      service.all$().subscribe({
        next: elements => {
          expect(elements).toEqual(testData);
          done();
        },
      });

      expect(notionServiceSpy.getRetrospectiveElements$).toHaveBeenCalledTimes(
        1
      );
    });

    xit('should reload retrospective elements when reload is called where force is false but cache is empty', done => {
      const initialTestData: RetrospectiveElement[] = [];
      const reloadTestData = testData;

      notionServiceSpy.getRetrospectiveElements$.and.returnValues(
        of(initialTestData),
        of(reloadTestData)
      );
      let observerCount = 0;
      let results: RetrospectiveElement[] = [];
      const observer: Observer<RetrospectiveElement[]> = {
        error: done.fail,
        complete: () => {
          // noop
        },
        next: elements => {
          results = elements;
          observerCount++;
        },
      };

      service.all$().subscribe(observer);
      service.reload();

      setTimeout(() => {
        expect(observerCount).toBe(2);
        expect(
          notionServiceSpy.getRetrospectiveElements$
        ).toHaveBeenCalledTimes(2);
        expect(results).toEqual(reloadTestData);
        done();
      }, jasmine.DEFAULT_TIMEOUT_INTERVAL - 1000);
    });
  });
});
