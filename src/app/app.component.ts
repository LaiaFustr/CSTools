import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FinalCSToolsFront';


  ngOnInit(): void {
    $(document).ready(() => {
      $('#myElement').text('Hello, jQuery with Angular!');
    });
  }
}
