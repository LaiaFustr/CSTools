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

  }

  fisrtRowChange() {
    this.compDates()
  }

  compDates() {
    this.vessel_arrival = $("#vessArrivCalc").val();
    this.gate_out_full = $("#gateOutFullContCalc").val();
    this.gate_empty = $("#gateEmptyCalc").val();


    if (this.vessel_arrival != "" && this.gate_out_full != "" && this.gate_empty != "") {

      if (this.vessel_arrival > this.gate_out_full) {
        $("#gateOutFullContCalc").val("");
        let error = "Must be greater than Vessel Arrival."
        $("#gateOutFullContCalc").siblings('.invalid-feedback').text(error).show()
      }
      if (this.gate_out_full > this.gate_empty) {
        $("#gateEmptyCalc").val("");

        let error = "Must be greater than Gate Out Full."
        $("#gateEmptyCalc").siblings('.invalid-feedback').text(error).show()
       
      }
    }else{

    }





















    /* let bool = true;
    if (
      $(".firstRowCalc").each(function () {
        if ($(this).val() == "")
          bool = false;
      })) {

      if (bool) {
        $(".secThRowCalc").each(function () {
          $(this).prop('disabled', false);
        })
      }

    } else {
      $(".secThRowCalc").each(function () {
        $(this).prop('disabled', true);
      })
      $(".resRowCalcu").hide()
      this.hideBorderClass()
    } */

  }









  dscCalc(e: any) {
    if (e.handled !== true) {
      this.showRes()
      this.calcRes()
      this.messageError()

      e.handled = true;
    }

  }

  messageError() {
    $("#errorMessageC").empty();

    let valido = true;
    let error = '';
    let success = false;
    let errorMessage = '';

    if ($("#vessArrivCalc").val() == "") {
      //$(error) += '<strong>Vessel Arrival</strong> is mandatory.<br>';
      valido = false;

    }
    if ($("#carrierCalc").val() == "") {
      error += '<strong>Carrier</strong> is mandatory.<br>';
      valido = false;
    }
    if ($("#portCalc").val() == "") {
      error += '<strong>Port</strong> is mandatory.<br>';
      valido = false;
    }
    if ($("#containCalc").val() == "") {
      error += '<strong>Container</strong> is mandatory.<br>';
      valido = false;
    }
    if ($("#gateOutFullContCalc").val() == "" || $("#gateEmptyCalc").val() == "") {
      error += '<strong>Gate Out Full Container / Gate In Empty Container</strong> At least one of these fields has to be filled.<br>';
      valido = false;
    }

    console.log(valido)
    if (!valido) {
      errorMessage = '<div class="alert alert-danger message_div m-0 w-100 d-flex justify-content-center" role="alert"><p class="pt-2 text-center"> ' + error + '</p></div>';

      $("#errorMessageC").append(errorMessage).slideDown(500);
      $('.message_div').delay(5000).slideUp(function () {
        $("#errorMessageC").empty();
      })
    }
  }



  showRes() {

    let bool = true;
    if (bool) {
      $(".resRowCalcu").show();
      this.showBorderClass()
    } else {
      //cada campo tendrá un texto de error

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
    if (this.validateCalcData() == true) {
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

  }



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
