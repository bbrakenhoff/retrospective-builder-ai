import { TestBed } from '@angular/core/testing';

import { RetrospectiveElementService } from './retrospective-element.service';
import { Observer, of } from 'rxjs';
import { NotionService } from './notion.service';
import { TestDataFactory } from '../../../testing/test-data-factory';
import { RetrospectiveElement } from '../models';

fdescribe('RetrospectiveElementService', () => {
  const testData = TestDataFactory.createRetrospectiveElements();

  let notionServiceSpy: jasmine.SpyObj<NotionService>;

  let service: RetrospectiveElementService;

  beforeEach(() => {
    notionServiceSpy = jasmine.createSpyObj('NotionService', [
      'getRetrospectiveElements$',
    ]);
    notionServiceSpy.getRetrospectiveElements$.and.returnValue(of(testData));

    TestBed.configureTestingModule({
      providers: [{ provide: NotionService, useValue: notionServiceSpy }],
    });
    service = TestBed.inject(RetrospectiveElementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('all$()', () => {
    it('should load retrospective elements on initial load', done => {
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

    it('should reload retrospective elements when reload is called', done => {
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
  });
});
