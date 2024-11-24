import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Retrospective } from '../../../core/models/retrospective.model';

@Component({
  selector: 'app-retrospective-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './retrospective-cards.component.html',
})
export class RetrospectiveCardsComponent {
  @Input() heading!: string;
  @Input() retrospectives: Retrospective[] = [];
}
