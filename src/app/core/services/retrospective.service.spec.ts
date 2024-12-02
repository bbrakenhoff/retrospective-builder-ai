import { TestBed } from '@angular/core/testing';

import { RetrospectiveService } from './retrospective.service';
import { Observer, of } from 'rxjs';
import { Retrospective, RetrospectiveElement } from '../models';
import { TestDataFactory } from '../../../testing/test-data-factory';
import { NotionService } from './notion.service';
import { RetrospectiveElementService } from './retrospective-element.service';

fdescribe('RetrospectiveService', () => {
  const testData = {
    retrospectives: TestDataFactory.createRetrospectives(),
    retrospectiveElements: TestDataFactory.createRetrospectiveElements(),
  };

  let notionServiceSpy: jasmine.SpyObj<NotionService>;
  let retrospectiveElementServiceSpy: jasmine.SpyObj<RetrospectiveElementService>;

  let service: RetrospectiveService;

  beforeEach(() => {
    notionServiceSpy = jasmine.createSpyObj('NotionService', [
      'getRetrospectives$',
    ]);
    notionServiceSpy.getRetrospectives$.and.returnValue(
      of(testData.retrospectives)
    );
    retrospectiveElementServiceSpy = jasmine.createSpyObj(
      'RetrospectiveElementService',
      ['all$']
    );
    retrospectiveElementServiceSpy.all$.and.returnValue(
      of(testData.retrospectiveElements)
    );

    TestBed.configureTestingModule({
      providers: [
        { provide: NotionService, useValue: notionServiceSpy },
        {
          provide: RetrospectiveElementService,
          useValue: retrospectiveElementServiceSpy,
        },
      ],
    });
    service = TestBed.inject(RetrospectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('all$', () => {
    it('should load retrospectives on initial load', done => {
      const isLoadingResults: boolean[] = [];
      service.isLoading$.subscribe({
        next: isLoading => isLoadingResults.push(isLoading),
      });

      service.all$().subscribe(retrospectives => {
        expect(retrospectives).toEqual(testData.retrospectives);
        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(1);
        expect(retrospectiveElementServiceSpy.all$).toHaveBeenCalledTimes(1);
        expect(isLoadingResults).toEqual([false, true, false]);
        done();
      });
    });

    it('should share the same observable instance among multiple subscribers', done => {
      service.all$().subscribe({
        next: retrospectives => {
          expect(retrospectives).toEqual(testData.retrospectives);
        },
      });

      service.all$().subscribe({
        next: retrospectives => {
          expect(retrospectives).toEqual(testData.retrospectives);
          done();
        },
      });

      expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(1);
      expect(retrospectiveElementServiceSpy.all$).toHaveBeenCalledTimes(1);
    });

    it('should reload retrospectives when reload is called where force is true', done => {
      const initialTestData = testData.retrospectives.slice(0, 1);
      const reloadTestData = testData.retrospectives.slice(1);

      notionServiceSpy.getRetrospectives$.and.returnValues(
        of(initialTestData),
        of(reloadTestData)
      );
      retrospectiveElementServiceSpy.all$.and.returnValues(
        of(testData.retrospectiveElements),
        of(testData.retrospectiveElements)
      );
      let observerCount = 0;
      const observer: Observer<Retrospective[]> = {
        error: done.fail,
        complete: () => {
          if (observerCount == 2) {
            done();
          } else {
            done.fail();
          }
        },
        next: retrospective => {
          observerCount++;

          if (observerCount === 1) {
            expect(retrospective).toEqual(initialTestData);
            expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(
              1
            );
            expect(retrospectiveElementServiceSpy.all$).toHaveBeenCalledTimes(
              1
            );
          } else if (observerCount == 2) {
            expect(retrospective).toEqual(reloadTestData);
            expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(
              2
            );
            expect(retrospectiveElementServiceSpy.all$).toHaveBeenCalledTimes(
              2
            );
            done();
          } else {
            done.fail();
          }
        },
      };

      service.all$().subscribe(observer);
      service.reload(true);
    });

    it('should reload retrospectives when reload is called where force is false and cache not empty', done => {
      const initialTestData = testData.retrospectives.slice(0, 1);
      const reloadTestData = testData.retrospectives.slice(1);

      notionServiceSpy.getRetrospectives$.and.returnValues(
        of(initialTestData),
        of(reloadTestData)
      );
      let observerCount = 0;
      let results: Retrospective[] = [];
      const observer: Observer<Retrospective[]> = {
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
        expect(results).toEqual(initialTestData);
        expect(observerCount).toBe(1);
        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(1);
        done();
      }, 1000);
    });

    it('should reload retrospectives when reload is called where force is false but cache is empty', done => {
      const initialTestData: Retrospective[] = [];
      const reloadTestData = testData.retrospectives;

      notionServiceSpy.getRetrospectives$.and.returnValues(
        of(initialTestData),
        of(reloadTestData)
      );
      let observerCount = 0;
      let results: Retrospective[] = [];
      const observer: Observer<Retrospective[]> = {
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
        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(2);
        expect(results).toEqual(reloadTestData);
        done();
      }, jasmine.DEFAULT_TIMEOUT_INTERVAL - 1000);
    });
  });
});
