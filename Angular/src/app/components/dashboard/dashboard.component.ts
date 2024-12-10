import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RetrospectiveElement } from '../../core/models';
import { Retrospective } from '../../core/models/retrospective.model';
import { RetrospectiveElementService } from '../../core/services/retrospective-element.service';
import { RetrospectiveService } from '../../core/services/retrospective.service';
import { RetrospectiveCardsComponent } from './retrospective-cards/retrospective-cards.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RetrospectiveCardsComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  isLoadingRetrospectives = false;
  unplannedRetrospectives$!: Observable<Retrospective[]>;
  pastRetrospectives$!: Observable<Retrospective[]>;

  constructor(private readonly retrospectiveService: RetrospectiveService) {}

  ngOnInit(): void {
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
