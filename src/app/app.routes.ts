import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { MenuComponent } from './portal/menu/menu.component';
import { SdcalculatorComponent } from './portal/menu/sdcalculator/sdcalculator.component';
import { ScheduleComponent } from './portal/menu/schedule/schedule.component';
import { KmdistancesComponent } from './portal/menu/kmdistances/kmdistances.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'portal',
        component: PortalComponent,
   },
    {
        path: 'portal/cstools',
        component: MenuComponent,
        children: [
            {
                path: 'sdcalculator',
                component: SdcalculatorComponent,
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
            },
            {
                path: 'kmdistances',
                component: KmdistancesComponent,
            },
            {
                path: '',
                redirectTo: 'sdcalculator',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
