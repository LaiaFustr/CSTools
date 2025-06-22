import { CommonModule } from '@angular/common';
import { SdcalculatorService } from '../../../services/sdcalculator/sdcalculator.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-sdcalculator',
  imports: [CommonModule],
  templateUrl: './sdcalculator.component.html',
  styleUrl: './sdcalculator.component.css'
})
export class SdcalculatorComponent {

  carriers: any[] = [];
  carrier: any;
  ports: any[] = [];
  port: any;
  vessel_arrival: any;
  gate_out_full: any;
  gate_empty: any;
  container: any;
  free_storage: any;
  free_demurrage: any;
  btnshow: boolean = false;


  total_sto_days: any;
  total_sto_pr_days: any;
  sto_tariff: any[] = [];
  sto_total: { SPE: string, USD: string } = { SPE: '', USD: '' }/* any[] = [] */;
  sto_details: any[] = [];


  total_dem_days: any;
  total_dem_pr_days: any;
  dem_tariff: any[] = [];
  dem_total: { SPE: string, USD: string } = { SPE: '', USD: '' };
  dem_details: any[] = [];



  constructor(private sdcalculator: SdcalculatorService) {
    this.indexCarriersPorts()
  }

  NgOnInit(): void {

    $(".resRowCalcu").hide()
    $("#accordionSD").hide()
    $('#carrierCalc').append('<option value="" hidden>Select carrier...</option>')

    $('#portCalc').append('<option value="" hidden>Select Port...</option>')

  }

  indexCarriersPorts() {

    //console.log("INDEX CARRIERS" + this.carrier + " -  PORTS" + this.port)

    if (this.carrier == "" || this.carrier == null) {
      this.sdcalculator.getIndexPort()
        .subscribe(data => {
          //console.log("------PORTS--------")
          this.ports = data;
          $('#portCalc').empty();
          $('#portCalc').append('<option value="" class="text-muted"selected>Select port...</option>')
          this.ports.forEach(elem => {
            if (elem['port'] == this.port) {
              $('#portCalc').append('<option value="' + elem['port'] + '" selected>' + elem['port'] + '</option>')
            } else {
              $('#portCalc').append('<option value="' + elem['port'] + '">' + elem['port'] + '</option>')
            }
          });
        });
    }

    if (this.port == "" || this.port == null) {
      this.sdcalculator.getIndexCarrier()
        .subscribe(data => {
          //console.log("------CARRIERS-------")
          this.carriers = data;
          $('#carrierCalc').empty();
          $('#carrierCalc').append('<option value="" class="text-muted"selected>Select carrier...</option>')
          this.carriers.forEach(elem => {
            if (elem['carrier'] == this.carrier) {
              $('#carrierCalc').append('<option value="' + elem['carrier'] + '" selected>' + elem['carrier'] + '</option>')
            } else {
              $('#carrierCalc').append('<option value="' + elem['carrier'] + '">' + elem['carrier'] + '</option>')
            }
          });
        });
    }
  }

  carriersWherePort(event: any) {
    this.port = (event.target as HTMLSelectElement).value;
    this.carrier = $("#carrierCalc").val();

    if (this.port != "" && this.port != null) {
      this.sdcalculator.getCarriersWherePort(this.port)
        .subscribe(data => {
          this.carriers = data;
          $('#carrierCalc').empty();
          $('#carrierCalc').append('<option value="" class="text-muted"selected>Select carrier...</option>')
          if (data.length > 0) {
            this.carriers.forEach(elem => {
              if (elem['carrier'] == this.carrier) {
                $('#carrierCalc').append('<option value="' + elem['carrier'] + '" selected>' + elem['carrier'] + '</option>')
              } else {
                $('#carrierCalc').append('<option value="' + elem['carrier'] + '">' + elem['carrier'] + '</option>')
              }

            });
          }

        });
    } else {
      this.indexCarriersPorts()
    }
    this.validateSD(event)
  }

  portsWhereCarrier(event: any) {
    this.carrier = (event.target as HTMLSelectElement).value;
    this.port = $("#portCalc").val();

    if (this.carrier != "" && this.carrier != null) {
      this.sdcalculator.getPortsWhereCarrier(this.carrier)
        .subscribe(data => {
          this.ports = data;
          $('#portCalc').empty();
          $('#portCalc').append('<option value="" class="text-muted"selected>Select port...</option>')
          if (data.length > 0) {
            this.ports.forEach(elem => {
              if (elem['port'] == this.port) {
                $('#portCalc').append('<option value="' + elem['port'] + '" selected>' + elem['port'] + '</option>')
              } else {
                $('#portCalc').append('<option value="' + elem['port'] + '">' + elem['port'] + '</option>')
              }
            });
          }
        });
    } else {
      this.indexCarriersPorts()
    }
    this.validateSD(event)
  }

  compDates() {
    this.vessel_arrival = $("#vessArrivCalc").val();
    this.gate_out_full = $("#gateOutFullContCalc").val();
    this.gate_empty = $("#gateEmptyCalc").val();
    let boolerror = false;

    if (this.vessel_arrival != "") {

      if (this.gate_out_full != "" && this.gate_out_full != null && this.vessel_arrival > this.gate_out_full) {
        boolerror = true;
        $("#gateOutFullContCalc").val("");
        this.gate_out_full = "";

        let error = "Must be greater than Vessel Arrival."
        $("#gateOutFullContCalc").addClass('is-invalid')
        $("#gateOutFullContCalc").siblings('.invalid-tooltip').text(error)
      } else {
        boolerror = false;
        $("#gateOutFullContCalc").removeClass('is-invalid')
      }

      if (this.gate_empty != "" && this.gate_empty != null && this.gate_out_full != "" && this.gate_out_full != null && this.gate_out_full > this.gate_empty) {
        boolerror = true;
        $("#gateEmptyCalc").val("");
        this.gate_empty = "";

        let error = "Must be greater than Gate Out Full."
        $("#gateEmptyCalc").addClass('is-invalid')
        $("#gateEmptyCalc").siblings('.invalid-tooltip').html(error)

      } else {
        boolerror = false;
        $("#gateEmptyCalc").removeClass('is-invalid')
      }


      //console.log(this.vessel_arrival)
      //console.log(this.gate_out_full)
      //console.log(this.gate_empty)
      if (this.vessel_arrival != "" && this.gate_out_full != "" && this.gate_empty != "" && !boolerror) {
        $('.rowdscalc').find('[disabled]').removeAttr('disabled')

      } else {
        $('.rowdscalc').find('*').not('#btnClear').prop('disabled', true);
        $(".resRowCalcu").hide()
      }
    }
  }









  dscCalc(e: any) {
    if (e.handled !== true) {
      this.showRes(e)
      e.handled = true;
    }

  }


  showRes(event: any) {
    this.vessel_arrival = $("#vessArrivCalc");
    this.gate_out_full = $("#gateOutFullContCalc");
    this.gate_empty = $("#gateEmptyCalc");
    this.container = $("#containCalc");
    this.port = $("#portCalc");
    this.carrier = $("#carrierCalc");
    this.free_storage = $("#freeStorageCalc");
    this.free_demurrage = $("#freeDemDaysCalc");

    let all = [{ index: 'vessel_arrival', value: this.vessel_arrival },
    { index: 'gate_out_full', value: this.gate_out_full },
    { index: 'gate_empty', value: this.gate_empty },
    { index: 'container', value: this.container },
    { index: 'carrier', value: this.carrier },
    { index: 'port', value: this.port },
    ]

    all.forEach((thiselement: any) => {
      if (thiselement.value.val() == "") {
        console.log(thiselement.value)
        $(thiselement.value).addClass('is-invalid')
        $(thiselement.value).siblings('.invalid-tooltip').show()
        $(".resRowCalcu").hide();

      } else {
        $(thiselement.value).removeClass('is-invalid');
      }
    });
    this.btnshow = true;

    if (this.vessel_arrival.val() != "" && this.gate_out_full.val() != "" && this.gate_empty.val() != "" && this.container.val() != "" && this.port.val() != "" && this.carrier.val() != "") {
      if (this.free_storage.val() != '' || this.free_storage.val() != null) {
        let patern = new RegExp(this.free_storage.prop('pattern'));
        //console.log(patern)
        if (!patern.test(this.free_storage.val())) {
          //console.log('Es un valor no valido de free sTORAGE')
          this.free_storage.addClass('is-invalid')
          this.free_storage.siblings('.invalid-tooltip').show()
          this.btnshow = false

        } else {
          this.free_storage.removeClass('is-invalid')
          this.free_storage.siblings('.invalid-tooltip').hide()
        }
      }

      if (this.free_demurrage.val() != '' || this.free_demurrage.val() != null) {
        let patern = new RegExp(this.free_demurrage.prop('pattern'));
        if (!patern.test(this.free_demurrage.val())) {
          //console.log('Es un valor no valido de free DEMURRAGE')

          this.free_demurrage.addClass('is-invalid')
          this.free_demurrage.siblings('.invalid-tooltip').show()

          this.btnshow = false
        } else {
          this.free_demurrage.removeClass('is-invalid')
          this.free_demurrage.siblings('.invalid-tooltip').hide()
        }
      }

      if (this.btnshow) {
        this.calcRes()
      }
    }

    if (this.btnshow) {
      this.validateSD(event)
    }
  }

  validateSD(event: any) {
    if (this.btnshow) {
      let sdelement = event.target as HTMLInputElement;
      //console.log(event.target)
      console.log(sdelement.id)
      if (sdelement.id != "btnCalcPr") {
        if (sdelement.value == "") {
          //console.log(sdelement.value)
          $(sdelement).addClass('is-invalid')
          $(sdelement).siblings('.invalid-tooltip').show()
          $(".resRowCalcu").hide();
        } else {
          $(sdelement).removeClass('is-invalid')
        }
      }
    }
  }




  calcRes() {
    $('.loadSpinner').show()
    $("#resRowCalcu").hide();
    $("#accordionSD").hide();

    let freeSto = parseInt(this.free_storage.val());
    let freeDem = parseInt(this.free_demurrage.val());
    //va a llamar a la funcion de la api que calculará el resultado
    this.sdcalculator.getCalculation(this.vessel_arrival.val(), this.gate_out_full.val(), this.gate_empty.val(), this.carrier.val(), this.port.val(), this.container.val(), freeSto, freeDem)

      .subscribe(result => {

        //console.log(result)
        //console.log(result['total_sto'])

        this.total_sto_days = result['stodays'];
        this.total_sto_pr_days = result['priced_sto'];
        this.sto_tariff = result['sto_tariff'];
        this.sto_total = result['total_sto'];
        this.sto_details = result['tariff_sto_detail'];
        this.total_dem_days = result['demdays'];
        this.total_dem_pr_days = result['priced_dem'];
        this.dem_tariff = result['dem_tariff'];
        this.dem_details = result['tariff_dem_detail'];
        this.dem_total = result['total_dem'];
        $('.loadSpinner').hide();
        $("#resRowCalcu").show();
        $("#accordionSD").show();

      });

  }

  validateFree(event: any) {
    let freeElement = event.target as HTMLInputElement;
    let freestodem = $('#' + freeElement.id);

    //console.log(freestodem)
    //console.log(freeElement.value)

    if (freestodem.val() != '' && freestodem.val() != null) {
      let patern = new RegExp(freestodem.prop('pattern'));
      //console.log(patern)
      if (!patern.test(freeElement.value)) {
        //console.log('Es un valor no valido de free sTORAGE')
        freestodem.addClass('is-invalid')
        freestodem.siblings('.invalid-tooltip').show()
        $("#resRowCalcu").hide();
        $('#accordionSD').hide();
      } else {
        freestodem.removeClass('is-invalid')
        freestodem.siblings('.invalid-tooltip').hide()

      }
    } else if (freestodem.val() == '' || freestodem.val() == null) {
      freestodem.removeClass('is-invalid')
      freestodem.siblings('.invalid-tooltip').hide()

    }
  }


  clickToggle(event: Event) {
    let btn = (event.currentTarget as HTMLButtonElement);
    let other = $('.btn').not(btn);

    if ($(btn).closest('button').attr('aria-expanded') === 'true') {
      $(btn).find('.icon').removeClass('fa-plus');
      $(btn).find('.icon').addClass('fa-minus');
      $(other).find('.icon').addClass('fa-plus');
      $(other).find('.icon').removeClass('fa-minus');


    } else {
      $(btn).find('.icon').addClass('fa-plus');
      $(btn).find('.icon').removeClass('fa-minus');
      $(other).find('.icon').addClass('fa-plus');
      $(other).find('.icon').removeClass('fa-minus');
    }

  }

  clearAll() {
    let sdcalc = $('app-sdcalculator');
    sdcalc.find('input.is-invalid, select.is-invalid').removeClass('is-invalid')
    sdcalc.find('input, select').val('');
    //console.log('los inputs y selects')
    //console.log(sdcalc.find('input, select').val(''))
    /*     sdcalc.find('div.invalid-tooltip').hide() */
    $('.rowdscalc').find('input, select').not('#btnClear').prop('disabled', true);
    //console.log($('.rowdscalc').find('input, select').not('#btnClear'))
    //console.log(sdcalc.find('*'))
    /*    $('#desCountry').val(''); */
    /*  $('#desCountry').removeClass('is-invalid') */

  }
}
