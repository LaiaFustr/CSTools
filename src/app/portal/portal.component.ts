import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterModule, RouterLinkWithHref} from '@angular/router';
import { MenuComponent } from '../portal/menu/menu.component';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-portal',
  imports: [RouterOutlet, RouterLink, RouterModule, RouterLinkWithHref,MenuComponent ],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent {}
  
