import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalculator, faCalendarDay, faLocationCrosshairs, faTruckPlane, faPlus, faLessThan, faHome, faRightFromBracket, faBars, faDisplay , faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {MatTooltipModule} from '@angular/material/tooltip';


@Component({
  selector: 'app-menu',
  imports: [RouterOutlet, RouterLink, FontAwesomeModule , MatTooltipModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  faCalculator = faCalculator;
  faCalendarDay = faCalendarDay;
  faLocationCrosshairs = faLocationCrosshairs;
  faTruckPlane = faTruckPlane;
  faPlus = faPlus;
  faLessThan = faLessThan;
  faHome = faHome;
  faRightFromBracket = faRightFromBracket;
  faBars = faBars;
  faLocationDot = faLocationDot;
  tooltipDisabled = true;
  
  constructor() { }
  ngOnInit(): void {
    this.hoverSideToggle();
  }

  ngAfterViewInit(): void {
    this.appendSideMenu();
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
      /* $('#togIcon') */$('.togIcon').css('animation', 'toleft .3s linear')
      
      $('.togIcon').on('animationend', function(){
        $('.togIcon').css('transform', 'rotate(180deg)')
        $('.togIcon').css('box-shadow', '-4px -4px 4px var(--lightGrey)')

      })

      $('.sideBarIcon').addClass('fa-lg');
      $('.sideBarText').css('display', 'none');
      $('.sideBarText').css('width', '0%');
      $('.sideBarText').fadeOut(300);
      $('#allSideToggle').css('margin-left', '80px')
    
     this.tooltipDisabled = false;


    } else if ($('.side_nav').css('margin-left') == '0px' && $('.side_nav').css('min-width') == '100px') {
      //console.log('entro2');
      $('.side_nav').css('max-width', '250px');
      $('.side_nav').css('min-width', '250px');

      $('#sideLogo').attr('width', '150px');
      $('#sideBarToggle').css('display', 'none');

      $('#content').css('max-width', 'calc(100% - 250px)');
      $('.togIcon').css('animation', 'toright .3s linear')
      
      $('.togIcon').on('animationend', function(){
        $('.togIcon').css('transform', 'rotate(0deg)')
        $('.togIcon').css('box-shadow', '4px 4px 4px var(--lightGrey)')
      })
      
      $('.sideBarIcon').removeClass('fa-lg');
      $('#sideBarToggle').css('display', 'block');
      $('.sideBarText').fadeIn(300);
      $('.sideBarText').css('width', '77%');
      $('#allSideToggle').css('margin-left', '230px')

      this.tooltipDisabled = true;
      
    }

  }

  hoverSideToggle() {
    $('#allSideToggle, #sideBarToggle').on('mouseover', function () {
      $('#sideBarToggle').css('background-color', 'rgb(235, 235, 235)');
    })
    $('#allSideToggle, #sideBarToggle').on('mouseout', function () {
      $('#sideBarToggle').css('background-color', 'var(--bgLightGrey)');
    })
  }


  appendSideMenu() {

    let listSidebar = $('#sideNavMenu').html();
    let noClass = $(listSidebar);

    noClass.find('*').removeClass();
    noClass.find('*').removeAttr('style');
    noClass.find('a').css({
      'color': 'black',
      'text-decoration': 'none',
      'display': 'inline-block',
      'padding-left': '10px'
    });
    noClass.find('svg').closest('span').css({
      ' width': '19px',
      ' font-size': ' 1.2rem',
      'padding': '13px',
      'margin-right': ' 15px',
      ' height': '35px',
      ' line-height': '35px',
      'display': 'inline-block',
      'align-items': 'center',
      'justify-content': 'center',
    })
    noClass.find('svg').closest('span').closest('a').css({
      'width': '82vw',
      'border-radius': '7px',
    })


    noClass.find('svg').css({
      'color': 'black',
      'width': '20px',
      'height': '20px'
    });

    noClass.find('li').css({
      'display': 'block'
    });

    noClass.find('svg').closest('span').siblings('span').css({
      'overflow': 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'nowrap',
      'text-wrap': 'nowrap',
      'display': ' inline-flex',
      'transition': 'width 0.3s ease',
    });

    $('#copSideBar').empty();
    $('#copSideBar').append(noClass);
  }
}

