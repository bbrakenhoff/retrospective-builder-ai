import { Routes } from '@angular/router';
import { RetrospectiveElementsComponent } from './components/retrospective-elements/retrospective-elements.component';
import { RetrospectivesComponent } from './components/retrospectives/retrospectives.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'retrospectives',
    pathMatch: 'full'
  },
  {
    path: 'retrospective-elements',
    component: RetrospectiveElementsComponent
  }, {
    path:'retrospectives',
    component: RetrospectivesComponent
  }
];
