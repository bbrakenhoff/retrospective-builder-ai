import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotionService } from '../../core/services/notion.service';

@Component({
  selector: 'app-retrospective-elements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retrospective-elements.component.html'
})
export class RetrospectiveElementsComponent {

  public readonly retrospectiveElements$;

  public constructor(private readonly notionService: NotionService) { 
    this.retrospectiveElements$ = this.notionService.getRetrospectiveElements$();
  }
} 