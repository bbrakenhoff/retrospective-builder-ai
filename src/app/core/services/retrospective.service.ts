import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, share } from 'rxjs';
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

  all$(force = false): Observable<Retrospective[]> {
    this.reload(force);
    return this.cache$$.asObservable().pipe(share());
  }

  pastRetrospectives$(force = false): Observable<Retrospective[]> {
    const today = DateTime.now().startOf('day');
    return this.all$(force).pipe(
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

  unplannedRetrospectives$(force = false): Observable<Retrospective[]> {
    return this.all$(force).pipe(
      map(retrospectives =>
        (retrospectives ?? []).filter(retrospective => !retrospective.date)
      )
    );
  }

  reload(force = false): void {
    if (force || this.cache$$.value.length === 0) {
      this.isLoading$$.next(true);

      combineLatest({
        retrospectives: this.notionService.getRetrospectives$().pipe(take(1)),
        elements: this.retrospectiveElementService.all$().pipe(take(1)),
      })
        .pipe(take(1), share())
        .subscribe({
          next: ({ retrospectives, elements }) => {
            this.updateCache(retrospectives, elements);
          },
          error: e => {
            console.error(`🩷Bijoya - retrospective.service.ts > 69 error`, e);
          },
        });
    }
  }

  private updateCache(
    retrospectives: Retrospective[],
    elements: RetrospectiveElement[]
  ) {
    const retrospectivesWithPhases = retrospectives.map(retrospective =>
      this.populateRetrospectiveWithPhases(retrospective, elements)
    );
    this.cache$$.next(retrospectivesWithPhases);
    this.isLoading$$.next(false);
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
