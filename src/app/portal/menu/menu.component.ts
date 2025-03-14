import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  faCalculator = faCalculator;



  constructor() { }
  ngOnInit(): void {

    //const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))



  }

  clicking() {
    const SIDEBAR_EL = $("#side_nav");
    const SUB_MENU_ELS = $(".sideNavMenu > ul > .menu-item.sub-menu");
    const FIRST_SUB_MENUS_BTN = $(".sideNavMenu > #listSideBar > .submenuList");
    const INNER_SUB_MENUS_BTN = $(".sideNavMenu > ul > .menu-item.sub-menu .menu-item.sub-menu > a");

    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')

    if ($('.side_nav').css('margin-left') == '0px' && $('.side_nav').css('min-width') == '250px') {
      //console.log('entro1');
      $('.side_nav').css('max-width', '100px');
      $('.side_nav').css('min-width', '100px');
      $('#sideLogo').attr('width', '60%');
      $('#content').css('max-width', 'calc(100% - 100px)');
      $('#togIcon').removeClass('fa-less-than');
      $('#togIcon').addClass('fa-greater-than');
      $('.sideBarIcon').addClass('fa-lg');
      $('.sideBarText').css('display', 'none');
      $('.sideBarText').css('width', '0%');
      //$('.divSideElem').addClass('d-flex justify-content-center w-100');
      $('.sideBarText').fadeOut(300);

      /*  tooltip(); */


    } else if ($('.side_nav').css('margin-left') == '0px' && $('.side_nav').css('min-width') == '100px') {
      //console.log('entro2');
      $('.side_nav').css('max-width', '250px');
      $('.side_nav').css('min-width', '250px');

      $('#sideLogo').attr('width', '150px');
      $('#sideBarToggle').css('display', 'none');
      $('#content').css('max-width', 'calc(100% - 250px)');
      $('#togIcon').removeClass('fa-greater-than');
      $('#togIcon').addClass('fa-less-than');
      $('.sideBarIcon').removeClass('fa-lg');
      $('#sideBarToggle').css('display', 'block');
      //$('.divSideElem').removeClass('d-flex justify-content-center w-100');
      $('.sideBarText').fadeIn(300);
      $('.sideBarText').css('width', '77%');

      /*   tooltip(); */
    }


    $('#sideBarToggle, #allSideToggle').on('click', function () {
      if (SIDEBAR_EL.hasClass('small')) {
        SIDEBAR_EL.removeClass('small')
        //console.log('tenia clase small y entra aqui');
      } else {
        SIDEBAR_EL.addClass('small')
        //console.log('no tenia clase small y entra aqui');
      }

    });

  }
}

