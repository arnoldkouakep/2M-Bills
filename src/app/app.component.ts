import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './shared/services/auth.service';
import {UserIdleService} from 'angular-user-idle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Julia Bills';
  isBrowser;
  isVisible = false;

  // AuthenticationService with real backend
  constructor(private userIdle: UserIdleService,
              private router: Router,
              private authService: AuthenticationService) {
  }

  isLogin(): boolean {
    // console.log(this.authService.isLogin());
    return this.authService.isLogin(localStorage.getItem('authDBF'));
  }

  ngOnInit(): void {
    // Start watching for user inactivity.
    this.userIdle.startWatching();

    // Start watching when user idle is starting.
    // this.userIdle.onTimerStart().subscribe(count => console.log(count));

    // Start watch when time is up.
    this.userIdle.onTimeout().subscribe(() => {
        if (this.router.url.split('/')[1] !== 'login') {
          this.authService.clearSession();
        }
      }
    );
  }
}
