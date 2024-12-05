import { TestBed } from '@angular/core/testing';
import { of, ReplaySubject } from 'rxjs';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { TestDataFactory } from '../../../testing/test-data-factory';
import { Retrospective } from '../models';
import { NotionService } from './notion.service';
import { RetrospectiveService } from './retrospective.service';

fdescribe('RetrospectiveService', () => {
  const testData = {
    retrospectives: TestDataFactory.createRetrospectives(),
    retrospectiveElements: TestDataFactory.createRetrospectiveElements(),
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
    notionServiceSpy.getRetrospectives$.and.returnValue(
      of(testData.retrospectives)
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
          cold('r', { r: testData.retrospectives })
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
        const initialTestData = testData.retrospectives.slice(0, 2);
        const reloadTestData = testData.retrospectives.slice(2);

        notionServiceSpy.getRetrospectives$.and.returnValues(
          of(initialTestData),
          of(reloadTestData)
        );

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
          cold('(lr)', { l: initialTestData, r: reloadTestData })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilcrf)', { i: false, l: true, c: false, r: true, f: false })
        );
      });
    });

    it('should not reload retrospectives when reload is called where force is false and cache not empty', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const initialTestData = testData.retrospectives.slice(0, 2);
        const reloadTestData = testData.retrospectives.slice(2);

        notionServiceSpy.getRetrospectives$.and.returnValues(
          of(initialTestData),
          of(reloadTestData)
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
          cold('l', { l: initialTestData })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilc)', { i: false, l: true, c: false })
        );

        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(1);
      });
    });

    it('should not reload when already loading', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const initialTestData: Retrospective[] = [];
        const reloadTestData = testData.retrospectives;

        notionServiceSpy.getRetrospectives$.and.returnValues(
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

        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(1);
      });
    });

    it('should reload retrospectives when reload is called where force is false and cache is empty', () => {
      testScheduler.run(({ expectObservable, cold }) => {
        const initialTestData: Retrospective[] = [];
        const reloadTestData = testData.retrospectives;

        notionServiceSpy.getRetrospectives$.and.returnValues(
          of(initialTestData),
          of(reloadTestData)
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
          cold('(lr)', { l: initialTestData, r: reloadTestData })
        );

        expectObservable(replayIsLoading$$).toEqual(
          cold('(ilcrf)', { i: false, l: true, c: false, r: true, f: false })
        );

        expect(notionServiceSpy.getRetrospectives$).toHaveBeenCalledTimes(2);
      });
    });
  });
});
