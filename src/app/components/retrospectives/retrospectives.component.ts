import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotionService } from '../../core/services/notion.service';

@Component({
  selector: 'app-retrospectives',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retrospectives.component.html'
})
export class RetrospectivesComponent {

  public readonly retrospectives$;

  public constructor(private readonly notionService: NotionService) { 
    this.retrospectives$ = this.notionService.getRetrospectives$();
  }
} 