import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Retrospective } from '../../core/models/retrospective.model';
import { RetrospectiveService } from '../../core/services/retrospective.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  pastRetrospectives$!: Observable<Retrospective[]>;

  constructor(private readonly retrospectiveService: RetrospectiveService) {}

  ngOnInit(): void {
    this.pastRetrospectives$ = this.retrospectiveService
      .pastRetrospectives$()
      .pipe(map(retrospectives => retrospectives.slice(0, 5).slice(0, 5)));
  }
}
