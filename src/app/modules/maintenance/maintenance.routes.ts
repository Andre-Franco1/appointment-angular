import { Routes } from '@angular/router';
import { AppointmentTypePageComponent } from './pages/appointment-type-page/appointment-type-page';
import { AreaPageComponent } from './pages/area-page/area-page';
import { ProfessionalPageComponent } from './pages/professional-page/professional-page';
import { UserPageComponent } from './pages/user-page/user-page';
import { ClientsTablePageComponent } from './pages/clients-table-page/clients-table-page';

export const MAINTENANCE_ROUTES: Routes = [
  {path: 'appointment-type', component: AppointmentTypePageComponent},
  {path: 'area', component: AreaPageComponent},
  {path: 'clients-table', component: ClientsTablePageComponent},
  {path: 'professional', component: ProfessionalPageComponent},
  {path: 'user', component: UserPageComponent}
];
