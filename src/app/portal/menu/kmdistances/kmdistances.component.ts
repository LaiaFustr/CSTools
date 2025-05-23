import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
/* import {DragDropModule} from '@angular/cdk/drag-drop'; */

import { FormsModule } from '@angular/forms';
import { KmdistancesService } from '../../../services/kmdistances/kmdistances.service';

@Component({
  selector: 'app-kmdistances',
  imports: [CommonModule, FormsModule, /* DragDropModule */],
  templateUrl: './kmdistances.component.html',
  styleUrl: './kmdistances.component.css'
})
export class KmdistancesComponent {
  countries: any[] = [];
  /* country: string = ''; */
  oriCountry: Object = '';
  desCountry: Object = '';
  embcountry: any[] = [];


  constructor(private kmdistance: KmdistancesService) { this.getCountries(), this.getPorts() }

  NgOnInit() {
    $('#colResKm').hide();



  }
  NgAfterInit(): void {


  }


  /*   getLocalPC() {
      console.log(this.oriCountry);
      console.log(this.desCountry);
    } */

  getPorts() {

    this.kmdistance.getLocalPorts()
      .subscribe(ports => {
        //console.log(ports)
        ports.forEach(port => {
          //console.log(port['plptoloc']+ port['plnompto'])
          $('#oriPortOpc, #desPortOpc').append('<option  value="' + port['plcodpos'] + ' - ' + port['plnompto'] + '"> ' + port['plptoloc'] + '</option>')
        })
      })
  }

  getCountries() {

    this.kmdistance.getCountry()
      .subscribe(countries => {
        //console.log(countries)
        countries.forEach(country => {

          if (country['emb'] == "") {
            $('#oriCountryOpc, #desCountryOpc').append('<option country-code="' + country['papaicod'] + '" value="' + country['papaicod'] + ' - ' + country['papainom'] + '"> ' + country['papainom'] + '</option>')
          } else if (country['emb'] == 'EXCL') {
            $('#oriCountryOpc, #desCountryOpc').append('<option country-code="' + country['papaicod'] + '" value="' + country['papaicod'] + ' - ' + country['papainom'] + '*****' + country['emb'] + '*****"> ' + country['papainom'] + '</option>')
            this.embcountry.push(country)
          }



        });
      })
  }

  showhideSection(checkbox: Event) {
    let elem = checkbox.target as HTMLInputElement;

    let ini = '';
    let end = '';
    let stringId = '';
    let notStringId = '';

    if (elem.name.includes('Checkbox') && elem.checked == true) {

      if (elem.id.startsWith('ori')) {
        ini = 'ori';

      } else {
        ini = 'dest';

      }

      if (elem.id.includes('PC')) {
        end = 'Port'
      } else {
        end = 'PC'
      }

      stringId = elem.id.replace(ini, ini + 'Busqueda')
      notStringId = ini + 'Busqueda' + end;

      $('#' + stringId).css('display', 'block')
      $('#' + notStringId).css('display', 'none')
      $('#' + notStringId).find('input').val('');

      $('#' + notStringId).find('input').each(function (key, value) {
        //console.log(value.id)
        if (value.id.includes('Pc')) {
          value.setAttribute('disabled', 'true');
        }

      })
      $('#' + notStringId).find('button').css('display', 'none');
    }

  }

  getPcByCountry(event: Event) {
    //buscar el elemento padre de los dos y luego buscar por la clase o id del elemento input de puerto para activarlo y desactivarlo en función del valor de country
    let country = event.target as HTMLInputElement;
    let code = country.value.split(' - ')[0];
    //console.log(code)

    let ini = '';
    let end = '';

    if (country.id.startsWith('ori')) {
      ini = 'ori';
    } else {
      ini = 'des';
    }

    $('#' + ini + 'PcOptions').empty();
    /*  console.log(code) */

    this.kmdistance.getLocalPC(code)
      .subscribe(pcs => {
        pcs.forEach(pc => {
          //console.log(code)
          //console.log(pc)
          $('#' + ini + 'PcOptions').append('<option data-prv="' + pc['nameprov'] + '" data-pob="' + pc['nametownori'] + '" data-postcode="' + pc['minpc'] + '" value="' + pc['minpc'] + ' - ' + pc['nametown'] + '"><strong>' + pc['minpc'] + '</strong>, ' + pc['nametownori'] + ', ' + pc['nameprov'] + ' </option>');
        })
      })


  }
  showClearCross(event: Event) {

    let elem = event.target as HTMLInputElement;
    let id = (elem.id).charAt(0).toUpperCase() + (elem.id).slice(1);
    //console.log(elem.value)

    if (elem.value == '' || elem.value == null) {
      //console.log($('#clearInput' + id).attr('id'))
      $('#clearInput' + id).css('display', 'none')
    } else {
      $('#clearInput' + id).css('display', 'block')
    }
  }

  clearInput(event: Event) {
    let clear = event.target as HTMLInputElement;
    let inputId = clear.id.replace('clearInput', '')
    let id = inputId.charAt(0).toLowerCase() + inputId.slice(1);
    let pc = id.replace('Country', 'Pc')

    //console.log(id)
    //console.log(inputId)

    if (!id.includes('Pc') && !id.includes('Puerto')) {
      $('#' + id).val('');
      $('#' + id).removeClass('is-invalid')
      $('#' + id).siblings('.invalid-tooltip').hide()
      $('#' + clear.id).css('display', 'none')
      $('#' + clear.id.replace('Country', 'Pc')).css('display', 'none')
      $('#' + pc).val('');
      $('#' + pc).removeClass('is-invalid')
      $('#' + pc).siblings('.invalid-tooltip').hide()
      $('#' + pc).attr('disabled', 'disabled')

      /*  console.log(pc) */
    } else {
      $('#' + id).val('');
      $('#' + id).removeClass('is-invalid')
      $('#' + id).siblings('.invalid-tooltip').hide()
      $('#' + clear.id).css('display', 'none')
    }


  }

  clearAll() {
    $('#oriCountry').val('');
    $('#oriCountry').removeClass('is-invalid')
    $('#oriCountry').siblings('.invalid-tooltip').hide()

    $('#desCountry').val('');
    $('#desCountry').removeClass('is-invalid')
    $('#desCountry').siblings('.invalid-tooltip').hide()

    $('#oriPc').val('');
    $('#oriPc').removeClass('is-invalid')
    $('#oriPc').siblings('.invalid-tooltip').hide()

    $('#desPc').val('');
    $('#desPc').removeClass('is-invalid')
    $('#desPc').siblings('.invalid-tooltip').hide()

    $('#oriPuerto').val('');
    $('#oriPuerto').removeClass('is-invalid')
    $('#oriPuerto').siblings('.invalid-tooltip').hide()

    $('#desPuerto').val('');
    $('#desPuerto').removeClass('is-invalid')
    $('#desPuerto').siblings('.invalid-tooltip').hide()

    $('#clearInputOriCountry').css('display', 'none')
    $('#clearInputDesCountry').css('display', 'none')
    $('#clearInputOriPc').css('display', 'none')
    $('#clearInputDesPc').css('display', 'none')
    $('#clearInputDesPuerto').css('display', 'none')
    $('#clearInputOriPuerto').css('display', 'none')
    $('#oriPc').attr('disabled', 'disabled')
    $('#desPc').attr('disabled', 'disabled')
  }

  togglePc(event: Event) {
    let country = (event.target as HTMLInputElement);
    let code = country.value.split(' - ')[0];
    //falta conseguir el option con todos sus atributos y a partir de aqui, encontrar el codigo
    //console.log(country.id)
    let pc = country.id.replace('Country', 'Pc')
    //console.log($('#' + country.id + 'Opc option[country-code="'+code+'"]').val())


    if ($('#' + country.id).val() == null || $('#' + country.id).val() == '') {

      $('#' + pc).attr('disabled', 'disabled')



    } else {
      this.embcountry.forEach(emb => {
        if (!(emb['papaicod'] == code)) {
          $('#' + country.id).removeClass('is-invalid')
          $('#' + country.id).siblings('.invalid-tooltip').hide()
          $('#' + pc).removeAttr('disabled')
        } else {
          $('#colResKm').hide()
          $('#' + country.id).addClass('is-invalid')
          $('#' + country.id).siblings('.invalid-tooltip').text('This country is excluded.')
          $('#' + country.id).siblings('.invalid-tooltip').show()

        }
      })



    }

  }

  getDistance() {
    //ANGULAR//
    //al clicar boton calcular:

    //si pais de oricountry =='' o = null validación
    //else //
    //valor = oricountry.val()
    //for options.length -> 
    //valoricountry = ('data-noriginal) y varosicountryiso = ('data-iso')
    //origen cp/boblacion
    $('.chargingSpinner').show()
    $('#colResKm').hide()
    let error = false;
    let oricountry = '' /* String($('#oriCountry').val()) */;
    let descountry = ''/* String($('#desCountry').val()) */;
    let oriiso = ''/* String($('#oriCountry').val()).split(' - ')[0] */;
    let desiso = '' /* String($('#desCountry').val()).split(' - ')[0] */;
    let oripc = ''/* String($('#oriPc').val()).split(' - ')[0] */;
    let despc = ''/* String($('#desPc').val()).split(' - ')[0] */;

    /*     let oritown = '';
        let destown = $('#desCountry'); */


    /* this.oriCountry = '';
    this.desCountry = ''; */

    if ($('#origindiv input:checked').attr('id') == 'oriPC') {
      /* this.oriCountry = $('#oriCountry') */




      if ($('#oriCountry').val() == '' || $('#oriCountry').val() == null) {

        $('#colResKm').hide()

        $('#oriPc').val('')
        $('#oriPc').removeClass('is-invalid')
        $('#oriPc').siblings('.invalid-tooltip').hide()

        $('#oriCountry').addClass('is-invalid')
        $('#oriCountry').siblings('.invalid-tooltip').text('Required Field.')
        $('#oriCountry').siblings('.invalid-tooltip').show()
        error = true;
        $('.chargingSpinner').hide()

      } else {
        if (/* !true */$('#oriPc').val() == '' || $('#oriPc').val() == null) { //comprobar si estan rellenos city or postal code
          $('#colResKm').hide()
          $('#oriPc').addClass('is-invalid')
          $('#oriPc').siblings('.invalid-tooltip').text('Required Field.')
          $('#oriPc').siblings('.invalid-tooltip').show()
          error = true;
          $('.chargingSpinner').hide()
        } else {
          oricountry = String($('#oriCountry').val());
          oriiso = String($('#oriCountry').val()).split(' - ')[0];
          oripc = String($('#oriPc').val()).split(' - ')[0];

        }

      }
    } else if ($('#origindiv input:checked').attr('id') == 'oriPort') {
      $("#oriPuerto")
      if ($("#oriPuerto").val() == '' || $("#oriPuerto").val() == null) {
        $('#colResKm').hide()
        $("#oriPuerto").addClass('is-invalid')
        $("#oriPuerto").siblings('.invalid-tooltip').text('Required Field.')
        $("#oriPuerto").siblings('.invalid-tooltip').show()
        error = true;
        $('.chargingSpinner').hide()

      } else { //comprobar si estan rellenos city or postal code
        oricountry = 'ES'
        oriiso = 'ES'
        oripc = String($('#oriPuerto').val()).split(' - ')[0];

      }

    }

    if ($('#destdiv input:checked').attr('id') == 'destPC') { //checked desPC
      /*  this.desCountry = $('#desCountry') */

      if ($('#desCountry').val() == '' || $('#desCountry').val() == null) {
        $('#colResKm').hide()

        $('#desPc').val('')
        $('#desPc').removeClass('is-invalid')
        $('#desPc').siblings('.invalid-tooltip').hide()

        $('#desCountry').addClass('is-invalid')
        $('#desCountry').siblings('.invalid-tooltip').text('Required Field.')
        $('#desCountry').siblings('.invalid-tooltip').show()
        error = true;
        $('.chargingSpinner').hide()

      } else {

        if (/* !true */ $('#desPc').val() == '' || $('#desPc').val() == null) {//comprobar si estan rellenos city or postal code
          $('#colResKm').hide()
          $('#desPc').addClass('is-invalid')
          $('#desPc').siblings('.invalid-tooltip').text('Required Field.')
          $('#desPc').siblings('.invalid-tooltip').show()
          error = true;
          $('.chargingSpinner').hide()

        } else {
          descountry = String($('#desCountry').val());
          desiso = String($('#desCountry').val()).split(' - ')[0];
          despc = String($('#desPc').val()).split(' - ')[0];

        }



      }
    } else if ($('#destdiv input:checked').attr('id') == 'destPort') {
      $("#desPuerto")
      if ($("#desPuerto").val() == '' || $("#desPuerto").val() == null) {
        $('#colResKm').hide()
        $("#oriPuerto").addClass('is-invalid')
        $("#oriPuerto").siblings('.invalid-tooltip').text('Required Field.')
        $("#oriPuerto").siblings('.invalid-tooltip').show()
        error = true;
        $('.chargingSpinner').hide()

      } else {
        descountry = 'ES'
        desiso = 'ES'
        despc = String($('#desPuerto').val()).split(' - ')[0];


      }

    }

    if (!error) {
      //llamada a api
      //console.log($('#oriPuerto').val() + ' *** ' + $('#desPuerto').val())
      //console.log(oricountry + '*' + oriiso + '*' + descountry + '*' + desiso + '*' + oripc + '*' + despc + '*')

      $('.chargingSpinner').show()
      $('#colResKm').hide()
      this.kmdistance.getDistance(oricountry, oriiso, descountry, desiso, oripc, despc).subscribe(response => {
        //console.log(response)

        if (response['distkmokay'] == 0) {
          $('.calkm').html(response['distkm'])
        } else {
          $('.calkm').html(response['distkmokay'])
        }
        /* $('.calkm').html(response[]); */
        $('.chargingSpinner').hide()
        $('#colResKm').show()
      })
    } else {
      $('#colResKm').hide()
    }
  }



  validateKm(event: Event) {
    let input = event.target as HTMLInputElement;


    //console.log(input.id)
    if (input.value != '' && input.value != null) {
      /* this.embcountry.forEach(emb => { */
      /*  if (!(emb['papaicod'] == input.value.split(' - ')[0])) { */
      $('#' + input.id).removeClass('is-invalid')
      $('#' + input.id).siblings('.invalid-tooltip').hide()


      /*  } else {
         $('#colResKm').hide()
         $('#' + input.id).addClass('is-invalid')
         $('#' + input.id).siblings('.invalid-tooltip').show()

       } */
      /*  }) */
    } else {
      $('#colResKm').hide()
      $('#' + input.id).addClass('is-invalid')
      $('#' + input.id).siblings('.invalid-tooltip').text('Required Field.')
      $('#' + input.id).siblings('.invalid-tooltip').show()
    }
  }
}
