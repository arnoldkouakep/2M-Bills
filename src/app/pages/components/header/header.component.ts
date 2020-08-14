import {Component, OnInit} from '@angular/core';
import $ from 'jquery';
import {
  faBars,
  faBell,
  faChevronLeft,
  faChevronRight,
  faCog,
  faEllipsisV,
  faEnvelope,
  faSearch,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../shared/services/auth.service';
import {PageTitleService} from '../../../shared/services/page-title.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isVisible = true;
  direction = faChevronLeft;
  faSearch = faSearch;
  faBell = faBell;
  faEnvelope = faEnvelope;
  faEllipsisV = faEllipsisV;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  faBars = faBars;
  message: string;
  lang;

  constructor(private router: Router,
              // AuthenticationService with real backend
              private authService: AuthenticationService,
              private data: PageTitleService,
              public translate: TranslateService) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
  }

  logout() {
    this.authService.logout();
  }


  showSideBar() {
    if (!this.isVisible === true) {
      this.direction = faChevronLeft;
      $('.side-nav').css('width', '16em');
      $('.main').css('margin', '60px 0 0 16em');
      this.isVisible = true;
      $('.left-menu').css('display', 'block');
      $('.left-menu-resp').css('display', 'none');
      // setTimeout(() => {
      //   $('.profile').css('display', 'block');
      // }, 1000);
    } else {
      this.direction = faChevronRight;
      // $('.profile').css('display', 'none');
      // setTimeout(() => {
      // }, 1000);
      $('.side-nav').css('width', '50px');
      $('.main').css('margin', '60px 0 0 0');
      $('.left-menu').css('display', 'none');
      $('.left-menu-resp').css('display', 'block');
      this.isVisible = false;
    }
  }

  test() {
    console.log('well done');
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.message = message;
      // console.log(message);
    });
    $('.fa-bars').click(function() {
      $('.side-nav').css('width', '16em');
      $('.backdrop').css('display', 'block');
    });
    $('.backdrop').click(function() {
      $('.side-nav').css('width', '0');
      $('.backdrop').css('display', 'none');
    });
  }
}
