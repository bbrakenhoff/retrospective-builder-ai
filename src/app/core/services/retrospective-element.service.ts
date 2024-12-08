import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { RetrospectiveElement } from '../models';
import { NotionService } from './notion.service';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveElementService {
  private readonly cache$$ = new BehaviorSubject<RetrospectiveElement[]>([]);

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoading$$.asObservable();

  constructor(private notionService: NotionService) {}

  all$(force = false): Observable<RetrospectiveElement[]> {
    this.reload(force);
    return this.cache$$.asObservable();
  }

  reload(force = false): void {
    if (!this.isLoading$$.value && (force || this.cache$$.value.length === 0)) {
      this.isLoading$$.next(true);

      this.notionService
        .getRetrospectiveElements$()
        .pipe(take(1))
        .subscribe({
          next: elements => {
            this.cache$$.next(elements);
            this.isLoading$$.next(false);
          },
        });
    }
  }
}
