/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
/* import { TooltipModule } from '@syncfusion/ej2-angular-popups'; */


import $ from 'jquery';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
