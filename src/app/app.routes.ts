import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { MenuComponent } from './menu/menu.component';
import { DscalculatorComponent } from './portal/menu/dscalculator/dscalculator.component';
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
       /*  pathMatch: 'full', */
        children: [
            {
            path: 'cstools',
            component: MenuComponent,
            children: [
                {
                    path: 'sdcalculator',
                    component: DscalculatorComponent,
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
        }, /* {
            path: '',
            redirectTo: 'cstools',
            pathMatch: 'full'
        } */
    ],
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
