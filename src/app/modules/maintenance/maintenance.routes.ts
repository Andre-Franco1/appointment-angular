import { Routes } from '@angular/router';
import { AppointmentTypePageComponent } from './pages/appointment-type-page/appointment-type-page';
import { AreaPageComponent } from './pages/area-page/area-page';
import { ClientPageComponent } from './pages/client-page/client-page';
import { ProfessionalPageComponent } from './pages/professional-page/professional-page';
import { UserPageComponent } from './pages/user-page/user-page';

export const MAINTENANCE_ROUTES: Routes = [
  {path: 'appointment-type', component: AppointmentTypePageComponent},
  {path: 'area', component: AreaPageComponent},
  {path: 'client', component: ClientPageComponent},
  {path: 'professional', component: ProfessionalPageComponent},
  {path: 'user', component: UserPageComponent}
];
