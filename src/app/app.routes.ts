import { Routes } from '@angular/router';
import { RetrospectiveElementsComponent } from './components/retrospective-elements/retrospective-elements.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'retrospective-elements',
    pathMatch: 'full'
  },
  {
    path: 'retrospective-elements',
    component: RetrospectiveElementsComponent
  }
];
