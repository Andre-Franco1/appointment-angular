import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./modules/home/home.routes').then(m => m.HOME_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/maintenance/maintenance.routes').then(m => m.MAINTENANCE_ROUTES),
    },
    {
        path: '',
        loadChildren: () =>
            import('./modules/schedule/schedule.routes').then(m => m.SCHEDULE_ROUTES),
    }
];
