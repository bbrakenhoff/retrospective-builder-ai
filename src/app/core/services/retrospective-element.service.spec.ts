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
      testScheduler.run(helpers => {
        const { expectObservable, hot, cold } = helpers;

        const replayIsLoading$ = new ReplaySubject<boolean>();
        service.isLoading$.subscribe({
          next: isLoading => replayIsLoading$.next(isLoading),
        });

        expectObservable(replayIsLoading$).toEqual(
          hot('sa', { s: true, a: false })
        );
        expectObservable(service.all$()).toEqual(cold('a  ', { a: testData }));
      });
    });

    xit('_should load retrospective elements on initial load', done => {
      const isLoadingResults: boolean[] = [];
      service.isLoading$.subscribe({
        next: isLoading => isLoadingResults.push(isLoading),
      });

      service.all$().subscribe(elements => {
        expect(elements).toEqual(testData);
        expect(isLoadingResults).toEqual([false, true, false]);
        done();
      });
    });

    it('should share the same observable instance among multiple subscribers', done => {
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

    it('should reload retrospective elements when reload is called where force is true', done => {
      const initialTestData = testData.slice(0, 2);
      const reloadTestData = testData.slice(2);

      notionServiceSpy.getRetrospectiveElements$.and.returnValues(
        of(initialTestData),
        of(reloadTestData)
      );
      let observerCount = 0;
      const observer: Observer<RetrospectiveElement[]> = {
        error: done.fail,
        complete: () => {
          if (observerCount == 2) {
            done();
          }
        },
        next: elements => {
          observerCount++;

          if (observerCount === 1) {
            expect(elements).toEqual(initialTestData);
            expect(
              notionServiceSpy.getRetrospectiveElements$
            ).toHaveBeenCalledTimes(1);
          } else if (observerCount == 2) {
            expect(elements).toEqual(reloadTestData);
            expect(
              notionServiceSpy.getRetrospectiveElements$
            ).toHaveBeenCalledTimes(2);
            done();
          }
        },
      };

      service.all$().subscribe(observer);
      service.reload(true);
    });

    it('should reload retrospectiveelements when reload is called where force is false and cache not empty', done => {
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

    it('should reload retrospective elements when reload is called where force is false but cache is empty', done => {
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
