import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Retrospective } from '../../core/models/retrospective.model';
import { RetrospectiveService } from '../../core/services/retrospective.service';
import { RetrospectiveCardsComponent } from './retrospective-cards/retrospective-cards.component';
import { RetrospectiveElementService } from '../../core/services/retrospective-element.service';
import { RetrospectiveElement } from '../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RetrospectiveCardsComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isLoadingRetrospectiveElements = false;
  isLoadingRetrospectives = false;
  unplannedRetrospectives$!: Observable<Retrospective[]>;
  pastRetrospectives$!: Observable<Retrospective[]>;
  retrospectiveElements$!: Observable<RetrospectiveElement[]>;

  constructor(
    private readonly retrospectiveService: RetrospectiveService,
    private readonly retrospectiveElementService: RetrospectiveElementService
  ) {}

  ngOnInit(): void {
    this.retrospectiveElementService.isLoading$.subscribe({
      next: isLoading => (this.isLoadingRetrospectiveElements = isLoading),
    });
    this.retrospectiveElements$ = this.retrospectiveElementService.all$();

    this.retrospectiveService.isLoading$.subscribe({
      next: isLoading => (this.isLoadingRetrospectives = isLoading),
    });
    this.unplannedRetrospectives$ =
      this.retrospectiveService.unplannedRetrospectives$();
    this.pastRetrospectives$ = this.retrospectiveService
      .pastRetrospectives$()
      .pipe(map(retrospectives => retrospectives.slice(0, 5).slice(0, 5)));
  }
}
