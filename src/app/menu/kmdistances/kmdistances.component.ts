import { Component } from '@angular/core';

@Component({
  selector: 'app-kmdistances',
  imports: [],
  templateUrl: './kmdistances.component.html',
  styleUrl: './kmdistances.component.css'
})
export class KmdistancesComponent {
  
  /* const InputOriCountry = new InputDatalistEmbargo('oriCountry', 'clearInputOriCountry', 'oriCountryOpc'); // Control Input Country Origen
  const InputOriPc = new InputDatalist('oriPc', 'clearInputOriPc', 'oriPcOptions'); // Control Input City/Postal Code
  const InputOriPort = new InputDatalist('oriPuerto', 'clearInputOriPuerto', 'oriPortOpc'); // Control Input Port

  //CONTROL CAMPO POBLACIÓN ORIGEN HASTA SELECCINAR PAÍS
  $("#oriCountry").change(function() {
    if ($("#oriCountry").val() == '' || $("#oriCountry").val() == null || $("#oriCountry").attr('data-emb') === 'EXCL') {
      $("#oriPc").val('');
      $("#oriPc").prop('disabled', true)
      $("#oriPcOptions").empty()
      $("#clearInputOriPc").css("display", "none");
    } else {
      $("#oriPc").val('');
      $("#oriPc").prop('disabled', false)
      $("#oriPcOptions").empty()
    }
  })

  // CONTROLAR EL BOTÓN RADIO DE ORIGEN
  $('input[name="origin"]').change(function() {
    if ($(this).is(':checked')) {
      var valorOrigin = $(this).val();
      if (valorOrigin == "postalCode") {
        $(".oriBusquedaCP").show();
        $(".oriBusquedaPort").hide();
        InputOriPort.clearInput();
      } else if (valorOrigin == "port") {
        $(".oriBusquedaCP").hide();
        $(".oriBusquedaPort").show();
        InputOriCountry.clearInput();
      }
    }
  });

  //DESTINO

  const InputDesCountry = new InputDatalistEmbargo('desCountry', 'clearInputDesCountry', 'desCountryOpc'); // Control Input Country Origen
  const InputDesPc = new InputDatalist('desPc', 'clearInputDesPc', 'desPcOptions'); // Control Input City/Postal Code
  const InputDesPort = new InputDatalist('desPuerto', 'clearInputDesPuerto', 'desPortOpc'); // Control Input Port

  //CONTROL CAMPO POBLACIÓN DESTINO HASTA SELECCINAR PAÍS
  $("#desCountry").change(function() {
    if ($("#desCountry").val() == '' || $("#desCountry").val() == null || $("#desCountry").attr('data-emb') === 'EXCL') {
      $("#desPc").val('');
      $("#desPc").prop('disabled', true)
      $("#desPcOptions").empty()
      $("#clearInputDesPc").css("display", "none");
    } else {
      $("#desPc").val('');
      $("#desPc").prop('disabled', false)
      $("#desPcOptions").empty()
    }
  })

  // CONTROLAR EL BOTÓN RADIO DE DESTINO
  $('input[name="destination"]').change(function() {
    if ($(this).is(':checked')) {
      var valorOrigin = $(this).val();
      if (valorOrigin == "postalCode") {
        $(".desBusquedaCP").show();
        $(".desBusquedaPort").hide();
        InputDesPort.clearInput();
      } else if (valorOrigin == "port") {
        $(".desBusquedaCP").hide();
        $(".desBusquedaPort").show();
        InputDesCountry.clearInput();
      }
    }
  });

  // GENERAL

  //BUSQUEDA POBLACION / CODIGO POSTAL ORIGEN AL PULSAR ENTER
  $(document).on("keyup paste", '.searchCityPC', function(e) {
    if (e.which == 13) {
      dataList = '#' + $(this).attr('list');
      countrySelector = '#' + $(this).attr('country');
      countryIso = $(countrySelector).val().substring(0, 2);
      searchCityPC(e.target.value, countryIso, dataList);
    }
  });

  // FUNCIÓN BÚSQUEDA DE CÓDIGOS POSTALES
  function searchCityPC(str, countryIso, dataList) {
  if (str !== '') {
    $.ajax({
      url: 'resources/get/getPC.php',
      type: 'post',
      data: {
        str: str,
        country: countryIso
      },
      dataType: 'json',
      beforeSend: function () {
        $(dataList).empty();
      },
      success: function (response) {
        if (response['RESPONSE'] == 'SUCCESS') {
          if (response['COUNT'] > 0) {
            for (let index = 0; index < response['COUNT']; index++) {
              $(dataList).append('<option data-prv="' + response['RES'][index]['PRV'] + '" data-pob="' + response['RES'][index]['NORIGINAL'] + '" data-codPostal="' + response['RES'][index]['DATA'] + '" value="' + response['RES'][index]['DATA'] + ' - ' + response['RES'][index]['POB'] + '">' + response['RES'][index]['SHOW'] + '</option>');
            }
          }
        }
        if (response['RESPONSE'] == 'LOGOUT') {
          window.location.href = '/logout.php'
        }
      }
    });
  }
}

//BOTÓN CLEAR DATA
$('#btnClear').click(function () {
  InputOriPort.clearInput();
  InputOriCountry.clearInput();
  InputDesPort.clearInput();
  InputDesCountry.clearInput();
  //Ocultar mensajes de error
  $("#validarOriCountry").hide();
  $("#validarOriPc").hide();
  $("#validarOriPuerto").hide();
  $("#validarDesCountry").hide();
  $("#validarDesPc").hide();
  $("#validarDesPuerto").hide();
  //Limpiar Resultado
  $(".calkm").text("");
});

// BOTÓN CALCULO DE KM - COMPROBAMOS CAMPOS Y LANZAMOS FUNCIÓN
$('#btnCalculate').click(function () {
  //COMPROBAMOS CAMPOS Y RECUPERAMOS VALORES 
  //aqui mostramos el spinner

  valido = true;
  //ORIGEN
  if ($('input[name="origin"]:checked').val() == "postalCode") {

    //ORIGEN - PAIS
    if ($("#oriCountry").val() == '' || $("#oriCountry").val() == null) {
      $("#validarOriCountry").show();
      valido = false
    } else {
      //COGEMOS ATRIBUTOS COUNTRY - COUNTRYISO
      options = $('#oriCountryOpc')[0].options;
      val = $("#oriCountry").val()
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === val && val != '') {
          valOriCountry = options[i].getAttribute('data-noriginal')
          valOriCountryIso = options[i].getAttribute('data-iso')
          break;
        }
      }

    }

    //ORIGEN - CODIGO POSTAL/POBLACIÓN
    if ($("#oriPc").val() == '' || $("#oriPc").val() == null) {
      $("#validarOriPc").show();
      valido = false
    } else {
      //COGEMOS CÓDIGO POSTAL - POBLACIÓN
      options = $('#oriPcOptions')[0].options;
      val = $("#oriPc").val()
      valOriPc = ''
      valOriName = ''
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === val && val != '') {
          valOriPc = options[i].getAttribute('data-codpostal')
          valOriName = options[i].getAttribute('data-pob')
          break;
        }
      }
    }


    // ORIGEN - PUERTO
  } else if ($('input[name="origin"]:checked').val() == "port") {
    if ($("#oriPuerto").val() == '' || $("#oriPuerto").val() == null) {
      $("#validarOriPuerto").show();
      valido = false
    } else {
      // COGEMOS ATRIBUTOS DEL PUERTO
      options = $('#oriPortOpc')[0].options;
      val = $("#oriPuerto").val()
      valOriCountry = ''
      valOriCountryIso = ''
      valOriPc = ''
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === val && val != '') {
          valOriCountry = options[i].getAttribute('data-pais')
          valOriCountryIso = options[i].getAttribute('data-paisiso')
          valOriPc = options[i].getAttribute('data-puertocp')
          break;
        }
      }
      valOriName = $("#oriPuerto").val();
    }
  }

  // DESTINO
  if ($('input[name="destination"]:checked').val() == "postalCode") {
    if ($("#desCountry").val() == '' || $("#desCountry").val() == null) {
      $("#validarDesCountry").show();
      valido = false;
    } else {
      //COGEMOS ATRIBUTOS COUNTRY - COUNTRYISO
      options = $('#desCountryOpc')[0].options;
      val = $("#desCountry").val()
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === val && val != '') {
          valDesCountry = options[i].getAttribute('data-noriginal')
          valDesCountryIso = options[i].getAttribute('data-iso')
          break;
        }
      }
    }

    //DESTINO - CODIGO POSTAL/POBLACIÓN
    if ($("#desPc").val() == '' || $("#desPc").val() == null) {
      $("#validarDesPc").show();
      valido = false;
    } else {
      options = $('#desPcOptions')[0].options;
      val = $("#desPc").val()
      valDesPc = ''
      valDesName = ''
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === val && val != '') {
          valDesPc = options[i].getAttribute('data-codpostal')
          valDesName = options[i].getAttribute('data-pob')
          break;
        }
      }
    }



    //DESTINO - PUERTO
  } else if ($('input[name="destination"]:checked').val() == "port") {
    if ($("#desPuerto").val() == '' || $("#desPuerto").val() == null) {
      $("#validarDesPuerto").show();
      valido = false;
    } else {
      options = $('#desPortOpc')[0].options;
      val = $("#desPuerto").val()
      valDesCountry = ''
      valDesCountryIso = ''
      valDesPc = ''
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === val && val != '') {
          valDesCountry = options[i].getAttribute('data-pais')
          valDesCountryIso = options[i].getAttribute('data-paisiso')
          valDesPc = options[i].getAttribute('data-puertocp')
          break;
        }
      }
      valDesName = $("#desPuerto").val();
    }
  }

  //console.log(valOriCountry);
  //console.log(valOriCountryIso);
  //console.log(valOriPc);
  //console.log(valOriName);
  //console.log(valDesCountry);
  //console.log(valDesCountryIso);
  //console.log(valDesPc);
  //console.log(valDesName); 

  if (valido) {
    $('.chargingSpinner').show();
    calculKM(valOriCountry, valOriCountryIso, valOriPc, valOriName, valDesCountry, valDesCountryIso, valDesPc, valDesName);
  }
});

// CONTROL DE CAMBIOS
$("#oriCountry").change(function () {
  $("#validarOriCountry").hide();
})
$("#oriPc").change(function () {
  $("#validarOriPc").hide();
})
$("#oriPuerto").change(function () {
  $("#validarOriPuerto").hide();
})
$("#desCountry").change(function () {
  $("#validarDesCountry").hide();
})
$("#desPc").change(function () {
  $("#validarDesPc").hide();
})
$("#desPuerto").change(function () {
  $("#validarDesPuerto").hide();
})

function calculKM(oriCountry, oriCountryIso, oriPc, OriTown, desCountry, desCountryIso, desPc, desTown) {
  $.ajax({
    url: 'resources/get/getCalculKm.php',
    type: 'post',
    dataType: 'json',
    data: {
      oriCountry: oriCountry,
      oriCountryIso: oriCountryIso,
      oriPc: oriPc,
      oriTown: OriTown,
      desCountry: desCountry,
      desCountryIso: desCountryIso,
      desPc: desPc,
      desTown: desTown
    },
    success: function (response) {

      if (response['RESPONSE'] == 'SUCCESS') {
        $(".calkm").text("");
        //aqui se esconderá el spinner
        $('.chargingSpinner').hide();
        $(".calkm").text(response['RES'] + ' Km');
      }

      if (response['RESPONSE'] == 'LOGOUT') {
        //aqui se esconderá el spinner
        $('.chargingSpinner').hide();
        window.location.href = '/logout.php'

      }

    }
  });
} */
}
