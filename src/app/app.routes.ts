import { Routes } from '@angular/router';
import { AppComponent } from "./app.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuComponent } from './portal/menu/menu.component';
import { SdcalculatorComponent } from './portal/menu/sdcalculator/sdcalculator.component';
import { ScheduleComponent } from './portal/menu/schedule/schedule.component';
import { KmdistancesComponent } from './portal/menu/kmdistances/kmdistances.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { adminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'portal',
        component: PortalComponent,
       canActivate: [authGuard]
   },
    {
        path: 'portal/cstools',
        component: MenuComponent,
        canActivate: [authGuard],
        children: [
            {
                path: 'sdcalculator',
                component: SdcalculatorComponent,
               canActivate: [authGuard],
            },
            {
                path: 'schedule',
                component: ScheduleComponent,
                canActivate: [authGuard],
            },
            {
                path: 'kmdistances',
                component: KmdistancesComponent,
                canActivate: [authGuard],
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
