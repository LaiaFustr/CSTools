import { SdcalculatorService } from '../../../services/sdcalculator/sdcalculator.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-sdcalculator',
  imports: [],
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
  sto_total: any;
  sto_details: any[] = [];


  total_dem_days: any;
  total_dem_pr_days: any;
  dem_tariff: any[] = [];
  dem_total: any;
  dem_details: any[] = [];




  constructor(private sdcalculator: SdcalculatorService) {
    this.indexCarriersPorts()
  }

  NgOnInit(): void {

    $(".resRowCalcu").hide()
    this.hideBorderClass()
    $('#carrierCalc').append('<option value="" hidden>Select carrier...</option>')

    $('#portCalc').append('<option value="" hidden>Select Port...</option>')
  }

  indexCarriersPorts() {

    console.log("INDEX CARRIERS" + this.carrier + " -  PORTS" + this.port)

    if (this.carrier == "" || this.carrier == null) {
      this.sdcalculator.getIndexPort()
        .subscribe(data => {
          console.log("------PORTS--------")
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
          console.log("------CARRIERS-------")
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

    if (this.vessel_arrival != ""/*  && this.gate_out_full != "" && this.gate_empty != "" */) {

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
        $('.rowdscalc').find('*').prop('disabled', true);
        $(".resRowCalcu").hide()
      }

    }
    /*  this.hideBorderClass() */
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
      this.calcRes()
      $(".resRowCalcu").show();
    }
    this.validateSD(event)
  }

  validateSD(event: any) {
    if (this.btnshow) {
      let sdelement = event.target as HTMLInputElement;
      //console.log(event.target)
      //console.log(sdelement)
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

  hideBorderClass() {
    $('.topPartGroup').css("border-radius", "");
    $('.topPartGroup').css("border-radius", "15px 15px 15px 15px");
  }
  showBorderClass() {
    $('.topPartGroup').css("border-radius", "");
    $('.topPartGroup').css("border-radius", "15px 15px 0px 0px");
  }

  validateCalcData() {
    let valid = true;

    $(".secndRowCalc").each(function () {
      if ($(this).val() == "") {
        valid = false;
      }
    })

    $(".firstRowCalc").each(function () {
      valid = true
      if ($(this).val() == "") {
        valid = false;
      }
    })

    return valid;
  }


  calcRes() {

    //va a llamar a la funcion de la api que calculará el resultado
    this.sdcalculator.getCalculation(this.vessel_arrival.val(), this.gate_out_full.val(), this.gate_empty.val(), this.carrier.val(), this.port.val(), this.container.val(), this.free_storage.val(), this.free_demurrage.val()).subscribe(result => {

    console.log(result)
      /* $('#totalDaysPort').text(result) */

      /* this.total_sto_days = result.
      this.total_sto_pr_days
      this.sto_tariff
      this.sto_total
      this.sto_details

      this.total_dem_days
      this.total_dem_pr_days
      this.dem_tariff
      this.dem_total
      this.dem_details */
    });

  }

  /* if (this.validateCalcData() == true) {
    $.ajax({
      url: 'resources/get/getCalc.php',
      type: 'post',
      data: {
        vessel_arrival: $("#vessArrivCalc").val(),
        carrier_calc: $("#carrierCalc").val(),
        free_storage: $("#freeStorageCalc").val(),
        gate_out_full: $("#gateOutFullContCalc").val(),
        port_calc: $("#portCalc").val(),
        free_demurrage: $("#freeDemDaysCalc").val(),
        gate_empty: $("#gateEmptyCalc").val(),
        container_tax: $("#containCalc").val(),

      },
      dataType: 'json',
      beforeSend: function () {
        (
          $("#totalDaysPort").empty(),
          $("#pricedDaysPort").empty(),
          $("#tariffPort").empty(),
          $("#totalPort").empty(),
          $("#totalDaysDem").empty(),
          $("#pricedDaysDem").empty(),
          $("#tariffDem").empty(),
          $("#totalDem").empty(),


          $("#tablePort").empty(),
          $("#tableDem").empty()

        )
      },
      success: function (response) {
        console.log(response)
        $('#totalDaysPort').html(response['PORT']['TOTALDAYS']);
        $('#pricedDaysPort').append(response['PORT']['PRICEDAYS']);
        $('#tariffPort').append(response['PORT']['TARIFF']);
        $('#totalPort').append(response['PORT']['TOTAL']);
        $('#tablePort').append(response['PORT']['DETAILS']);

        $('#errorMessageC').append(response['ERROR']);



        $('#totalDaysDem').append(response['DEM']['TOTALDAYS']);
        $('#pricedDaysDem').append(response['DEM']['PRICEDAYS']);
        $('#tariffDem').append(response['DEM']['TARIFF']);
        $('#totalDem').append(response['DEM']['TOTAL']);
        $('#tableDem').append(response['DEM']['DETAILS']);


        console.log(response['PORT']['TOTALDAYS'])
        console.log(response['PORT']['PRICEDAYS'])
        console.log(response['PORT']['TARIFF'])
        console.log(response['PORT']['TOTAL'])
        console.log(response['PORT']['DETAILS'])
        console.log(response['DEM']['TOTALDAYS'])
        console.log(response['DEM']['PRICEDAYS'])
        console.log(response['DEM']['TARIFF'])
        console.log(response['DEM']['TOTAL'])
        console.log(response['DEM']['DETAILS'])
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("Error:", textStatus, errorThrown);
      }

    });
  } else {

  }
*/




  extraInfo(e: any) {
    let tg = $(this).attr('tg')
    var $this = $(this);

    if ($(this).is('[aria-expanded = "false"]')) {
      $('#' + tg).removeClass('fa-minus').addClass('fa-plus');

      $(this).hover(function () {
        $(this).css("background-color", "");
        $(this).css("border", "1px solid #f9a207")
        $(this).css("color", "#f9a207")
      },
        function () {
          $(this).css("background-color", "#f9a207");
          $(this).css("border", "")
          $(this).css("color", "")
        })
    } else {
      $('#' + tg).removeClass('fa-plus').addClass('fa-minus');

      $(this).hover(function () {
        $(this).css("background-color", "");
        $(this).css("border", "1px solid #0057b7")
        $(this).css("color", "#0057b7")
      },
        function () {
          $(this).css("background-color", "#0057b7");
          $(this).css("border", "")
          $(this).css("color", "white")
        })

    }
  }


}
