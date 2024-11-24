import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Retrospective } from '../models/retrospective.model';
import { NotionService } from './notion.service'; // Assuming this exists
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveService {
  private retrospectiveCache$$ = new BehaviorSubject<Retrospective[]>([]);

  private isLoading$$ = new BehaviorSubject<boolean>(false);

  constructor(private notionService: NotionService) {}

  all$(): Observable<Retrospective[]> {
    this.loadRetrospectives();
    return this.retrospectiveCache$$.asObservable();
  }

  pastRetrospectives$(): Observable<Retrospective[]> {
    const today = DateTime.now().startOf('day');
    return this.all$().pipe(
      map(retrospectives =>
        retrospectives
          .filter(
            retrospective =>
              retrospective.date && retrospective.date.startOf('day') < today
          )
          .sort((a, b) => (b.date?.toMillis() ?? 0) - (a.date?.toMillis() ?? 0))
      )
    );
  }

  private loadRetrospectives(force = false): void {
    if (force || this.retrospectiveCache$$.value.length === 0) {
      this.isLoading$$.next(true);
      this.notionService
        .getRetrospectives$()
        .pipe(take(1))
        .subscribe({
          next: retrospectives => {
            this.retrospectiveCache$$.next(retrospectives);
            this.isLoading$$.next(false);
          },
        });
    }
  }
}
