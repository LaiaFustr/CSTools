import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { MenuComponent } from './menu/menu.component';
import { SdcalculatorComponent } from './menu/sdcalculator/sdcalculator.component';
import { ScheduleComponent } from './menu/schedule/schedule.component';
import { KmdistancesComponent } from './menu/kmdistances/kmdistances.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';

export const routes: Routes = [
    {
        path: 'cstools',
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
    }, {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'portal',
        component: PortalComponent,
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
