import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portal',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent {

}
