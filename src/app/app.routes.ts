import { Routes } from '@angular/router';
import { RetrospectiveElementsComponent } from './components/retrospective-elements/retrospective-elements.component';
import { RetrospectivesComponent } from './components/retrospectives/retrospectives.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'retrospective-elements',
    component: RetrospectiveElementsComponent,
  },
  {
    path: 'retrospectives',
    component: RetrospectivesComponent,
  },
];
