import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterLinkWithHref, Router } from '@angular/router';

@Component({
  selector: 'app-portal',
  imports: [RouterLink, RouterModule, RouterLinkWithHref],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css'
})
export class PortalComponent {
  constructor(private router: Router) { }
  logout() {
    sessionStorage.clear()
  }
}

