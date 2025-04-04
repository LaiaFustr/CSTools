import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KmdistancesService } from '../../../services/kmdistances/kmdistances.service';

@Component({
  selector: 'app-kmdistances',
  imports: [CommonModule],
  templateUrl: './kmdistances.component.html',
  styleUrl: './kmdistances.component.css'
})
export class KmdistancesComponent {
  countries: any[] = [];


  constructor(private kmdistance: KmdistancesService) { this.getCountries() }

  NgOnInit(): void {

  }

  getCountries() {

    this.kmdistance.getCountry()
      .subscribe(countries => {
        console.log(countries)
        countries.forEach(country => {
          $('#oriCountryOpc').append('<option value="' + country['papaicod'] + ' - ' + country['papainom'] + '"> ' + country['papainom'] + '</option>')
          $('#desCountryOpc').append('<option value="' + country['papaicod'] + ' - ' + country['papainom'] + '">' + country['papainom'] + '</option>')
        });
      })
  }
  showhideSection() {
    //mostrar - ocultar seccion

  }

  activatePort(){
    //buscar el elemento padre de los dos y luego buscar por la clase o id del elemento input de puerto para activarlo y desactivarlo en función del valor de country
    //
  }
}
