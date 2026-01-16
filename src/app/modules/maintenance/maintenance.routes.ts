import { Routes } from '@angular/router';
import { AppointmentTypePageComponent } from './pages/appointment-type-page/appointment-type-page';
import { AreaPageComponent } from './pages/area-page/area-page';
import { ClientFormPageComponent } from './pages/client-form-page/client-form-page';
import { ClientsTablePageComponent } from './pages/clients-table-page/clients-table-page';
import { ProfessionalTablePageComponent } from './pages/professional-table-page/professional-table-page';
import { UserPageComponent } from './pages/user-page/user-page';
import { ProfessionalFormPageComponent } from './pages/professional-form-page/professional-form-page';

export const MAINTENANCE_ROUTES: Routes = [
  {path: 'appointment-type', component: AppointmentTypePageComponent},
  {path: 'area', component: AreaPageComponent},
  {path: 'clients-table', component: ClientsTablePageComponent},
  {path: 'client-form/:id', component: ClientFormPageComponent},
  {path: 'client-form', component: ClientFormPageComponent},
  {path: 'professionals-table', component: ProfessionalTablePageComponent},
  {path: 'professional-form/:id', component: ProfessionalFormPageComponent},
  {path: 'professional-form', component: ProfessionalFormPageComponent},
  {path: 'user', component: UserPageComponent}
];
