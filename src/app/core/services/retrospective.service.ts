import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  share,
} from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NotionService } from './notion.service'; // Assuming this exists
import { DateTime } from 'luxon';
import { RetrospectiveElementService } from './retrospective-element.service';
import { Retrospective, RetrospectiveElement } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveService {
  private readonly cache$$ = new BehaviorSubject<Retrospective[]>([]);

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoading$$.asObservable();

  constructor(
    private notionService: NotionService,
    private readonly retrospectiveElementService: RetrospectiveElementService
  ) {}

  all$(): Observable<Retrospective[]> {
    this.loadRetrospectives();
    return this.cache$$.asObservable().pipe(share());
  }

  pastRetrospectives$(): Observable<Retrospective[]> {
    const today = DateTime.now().startOf('day');
    return this.all$().pipe(
      map(retrospectives =>
        (retrospectives ?? [])
          .filter(
            retrospective =>
              retrospective.date && retrospective.date.startOf('day') < today
          )
          .sort((a, b) => (b.date?.toMillis() ?? 0) - (a.date?.toMillis() ?? 0))
      )
    );
  }

  unplannedRetrospectives$(): Observable<Retrospective[]> {
    return this.all$().pipe(
      map(retrospectives =>
        (retrospectives ?? []).filter(retrospective => !retrospective.date)
      )
    );
  }

  private loadRetrospectives(force = false): void {
    if (force || this.cacheIsEmpty) {
      this.isLoading$$.next(true);

      combineLatest({
        retrospectives: this.notionService.getRetrospectives$(),
        elements: this.retrospectiveElementService.all$(),
      })
        .pipe(take(1))
        .subscribe({
          next: ({ retrospectives, elements }) => {
            const retrospectivesWithPhases = retrospectives.map(retrospective =>
              this.populateRetrospectiveWithPhases(retrospective, elements)
            );
            this.cache$$.next(retrospectivesWithPhases);
            this.isLoading$$.next(false);
          },
          error: e => {
            console.error(`🩷Bijoya - retrospective.service.ts > 69 error`, e);
          },
        });
    }
  }

  private get cacheIsEmpty(): boolean {
    return this.cache$$.value.length === 0;
  }

  private populateRetrospectiveWithPhases(
    retrospective: Retrospective,
    elements: RetrospectiveElement[]
  ): Retrospective {
    return {
      ...retrospective,
      phases: {
        setTheStage: this.findRetrospectiveElementById(
          retrospective.phases.setTheStage?.id ?? '',
          elements
        ),
        gatherData: this.findRetrospectiveElementById(
          retrospective.phases.gatherData?.id ?? '',
          elements
        ),
        generateInsights: this.findRetrospectiveElementById(
          retrospective.phases.generateInsights?.id ?? '',
          elements
        ),
        decideWhatToDo: this.findRetrospectiveElementById(
          retrospective.phases.decideWhatToDo?.id ?? '',
          elements
        ),
        closing: this.findRetrospectiveElementById(
          retrospective.phases.closing?.id ?? '',
          elements
        ),
      },
    };
  }

  private findRetrospectiveElementById(
    id: string,
    elements: RetrospectiveElement[]
  ): RetrospectiveElement | null {
    return elements.find(element => element.id === id) ?? null;
  }
}
