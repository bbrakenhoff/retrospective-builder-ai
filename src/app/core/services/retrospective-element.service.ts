import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { RetrospectiveElement } from '../models';
import { NotionService } from './notion.service';

@Injectable({
  providedIn: 'root',
})
export class RetrospectiveElementService {
  private readonly retrospectiveElementCache$$ = new BehaviorSubject<
    RetrospectiveElement[]
  >([]);

  private isLoading$$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this.isLoading$$.asObservable();

  constructor(private notionService: NotionService) {}

  all$(): Observable<RetrospectiveElement[]> {
    this.loadRetrospectiveElements();
    return this.retrospectiveElementCache$$.asObservable();
  }

  // findForRetrospective(retrospectiveId: string): Observable<RetrospectiveElement[]> {
  //   return this.all$().pipe(
  //     map(elements =>
  //       elements.filter(element => element.)
  //     )
  //   );
  // }

  private loadRetrospectiveElements(): void {
    this.isLoading$$.next(true);
    this.notionService
      .getRetrospectiveElements$()
      .pipe(take(1))
      .subscribe({
        next: elements => {
          this.retrospectiveElementCache$$.next(elements);
          this.isLoading$$.next(false);
        },
      });
  }
}
