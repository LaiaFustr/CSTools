import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgbAlert/* , NgbTooltip */ } from '@ng-bootstrap/ng-bootstrap';


/* import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; */

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgbAlert/*  , NgbTooltip */],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
 
})
export class AppComponent {
  title = 'FinalCSToolsFront';
}
