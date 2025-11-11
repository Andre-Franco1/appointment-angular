import { Routes } from '@angular/router';
import { CancelAppointmentPageComponent } from './pages/cancel-appointment-page/cancel-appointment-page';
import { ClientHistoryPageComponent } from './pages/client-history-page/client-history-page';
import { CreateAppointmentPageComponent } from './pages/create-appointment-page/create-appointment-page';
import { ProfessionalPageComponent } from '../maintenance/pages/professional-page/professional-page';
import { ProfessionalWorkdaysPageComponent } from './pages/professional-workdays-page/professional-workdays-page';
import { TodayAppointmentsPageComponent } from './pages/today-appointments-page/today-appointments-page';


export const SCHEDULE_ROUTES: Routes = [
  {path: 'cancel-appointment', component: CancelAppointmentPageComponent},
  {path: 'client-history', component: ClientHistoryPageComponent},
  {path: 'create-appointment', component: CreateAppointmentPageComponent},
  {path: 'professional-workdays', component: ProfessionalWorkdaysPageComponent},
  {path: 'today-appointments', component: TodayAppointmentsPageComponent}
];
