import {Component, Input, OnInit} from '@angular/core';
// import * as $ from 'src/app/pages/emfs/node_modules/jquery';
import $ from 'jquery';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';
import {AuthenticationService} from '../../../shared/services/auth.service';
import {Menu} from '../../../shared/utils/menu';
import {Config} from '../../../shared/utils/config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // val = true;
  faCaretDown = faCaretDown;
  // sideNavWidth = '16em';
  isVisible = false;
  userName = '';
  userRole = '';

  @Input() options;
  // @Input() menus: Menu[];
  config: Config;

  menus: Menu[] = [
    {
      name: 'Front-end',
      iconClass: 'fa fa-code',
      active: true,
      submenu: [
        {name: 'HTML', url: '#'},
        {name: 'CSS', url: '#'},
        {name: 'Javascript', url: '#'}
      ]
    },
    {
      name: 'Responsive web',
      iconClass: 'fa fa-mobile',
      active: false,
      submenu: [
        {name: 'Tablets', url: '#'},
        {name: 'Mobiles', url: '#'},
        {name: 'Desktop', url: '#'}
      ]
    },
    {
      name: 'Web Browser',
      iconClass: 'fa fa-globe',
      active: false,
      submenu: [
        {name: 'Chrome', url: '#'},
        {name: 'Firefox', url: '#'},
        {name: 'Desktop', url: '#'}
      ]
    }
  ];

  constructor(private authService: AuthenticationService) {

    this.authService.getCurrentUser().subscribe(
      res => {
        // console.log('trouble',res);
        if (res) {
          this.userRole = 'Gestionnaire';
          this.userName = res.email;
          // for (let i = 0; i < res.roles.length; i++) {
          //   if (res.roles[i].name === 'Administrateur') {
          //     this.isVisible = true;
          //     this.userRole = 'Administrateur';
          //   }
          // }
        }
      }
    );
  }

  // toggle(id) {
  //   $('.panel').css('max-height', '0');
  //   $('.accordion').css({ 'background-color': '#33425b', color: '#fff' });
  //   $('#accordion' + id).css({ 'background-color': '#33425b', color: '#fff' });
  //   if ($('#panel' + id).css('max-height') === '100px') {
  //     $('#panel' + id).css('max-height', '0');
  //   } else {
  //     $('#panel' + id).css('max-height', '100px');
  //   }
  // }

  ngOnInit() {
    this.config = this.mergeConfig(this.options);

    $('.close-btn').click(function() {
      $('.side-nav').css('width', '0');
      $('.backdrop').css('display', 'none');
    });

    $('.left-menu a').click(function() {
      // if ($(this.window).width() < 1000) {
      //   $('.side-nav').css('width', '0');
      //   $('.backdrop').css('display', 'none');
      // }
    });
    $('.left-menu-resp a').click(function() {
      $('.main').css('margin', '60px 0 0 0');
    });
    // $('.accordion').mouseover(function () {
    //   $(this).css('background-color', '#777');
    // }).mouseout(function () {
    //   $(this).css('background-color', '');
    // });
  }

  mergeConfig(options: Config) {
    // 기본 옵션
    const config = {
      // selector: '#accordion',
      multi: true
    };

    return {...config, ...options};
  }

  toggle(index: number) {
    // 멀티 오픈을 허용하지 않으면 타깃 이외의 모든 submenu를 클로즈한다.
    if (!this.config.multi) {
      this.menus.filter(
        (menu, i) => i !== index && menu.active
      ).forEach(menu => menu.active = !menu.active);
    }

    // Menu의 active를 반전
    this.menus[index].active = !this.menus[index].active;
  }
}
