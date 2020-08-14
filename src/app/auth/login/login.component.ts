import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {faArrowLeft, faLock, faUser} from '@fortawesome/free-solid-svg-icons';
import {Title} from '@angular/platform-browser';
import {AuthenticationService} from '../../shared/services/auth.service';
import {ToastrService} from 'ngx-toastr';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  forgottenPasswordForm: FormGroup;
  resetPasswordForm: FormGroup;
  otpForm: FormGroup;

  isLoading = false;
  submitted = false;
  showForgottenPasswordForm = false;
  showOtpResetPaswordForm = false;
  showResetPaswordForm = false;
  showExpireSessionAlert = false;
  showBackButton = false;
  showOtpAlert = false;
  showLoader = false;
  isNotSamePassword = false;
  showLoginForm = true;

  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faArrowLeft = faArrowLeft;
  usrName = '';

  userName = '';
  returnUrl: string;
  oldPassword: any;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private location: Location,
    private titleService: Title) {
    if (localStorage.getItem('encryptOp')) {
      this.oldPassword = this.authenticationService.decrypt(localStorage.getItem('encryptOp'));
    }

    if (this.router.url.split('/')[2]) {
      if (this.router.url.split('/')[2] === 'renew-session') {
        // this.displayHideLoader();
        this.titleService.setTitle('2M-Bills : Session Expirée');
        this.usrName = localStorage.getItem('userName');
        this.showExpireSessionAlert = true;
      } else if (this.router.url.split('/')[2] === 'forgotten-password') {
        // this.displayHideLoader();
        this.titleService.setTitle('2M-Bills : Reinitialisation mot de passe');
        this.showForgottenPasswordForm = true;
        this.showLoginForm = false;
        this.showBackButton = true;
      } else if (this.router.url.split('/')[2] === 'otp-login') {
        console.log('testt');
        // this.displayHideLoader();
        this.titleService.setTitle('2M-Bills : Activation du compte');
        this.showBackButton = true;
        this.showForgottenPasswordForm = false;
        this.showOtpResetPaswordForm = true;
        this.showLoginForm = false;
        this.showOtpAlert = true;
      } else if (this.router.url.split('/')[2] === 'reset-password') {
        // this.displayHideLoader();
        this.showBackButton = true;
        this.showForgottenPasswordForm = false;
        this.showOtpResetPaswordForm = false;
        this.showResetPaswordForm = true;
        this.showLoginForm = false;
      }
    } else {
      this.titleService.setTitle('2M-Bills : Login');
      this.showForgottenPasswordForm = false;
      this.showLoginForm = true;
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  get ff() {
    return this.forgottenPasswordForm.controls;
  }

  get fOtp() {
    return this.otpForm.controls;
  }

  get fResetPassword() {
    return this.resetPasswordForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      this.isLoading = false;
      return;
    }
    this.login(this.f.username.value, this.f.password.value);
  }

  login(userName, password) {
    // console.log('test login');

    this.authenticationService.login(userName, password)
      .pipe(first()) // map(user => JSON.parse(user)))
      .subscribe(
        data => {
          localStorage.setItem('encryptOp', this.authenticationService.encrypt(password));
          localStorage.setItem('userName', userName);
          this.authSuccesTask(userName, password);
        },
        error => {
          console.log('mkm', error);
          this.authErrorTask(error, password);
        });
  }

  authErrorTask(error, password) {
    this.isLoading = false;
    console.log(error);
    if (error.status === 0) {
      this.toastr.error('Erreur de connexion internet ou serveur indisponible');
      return;
    }
    if (error.status === 498) {
      localStorage.setItem('encryptOp', this.authenticationService.encrypt(password));
      localStorage.setItem('userName', this.f.username.value);
      this.toastr.info('Entrer votre nouveau mot de passe');
      this.showLoader = true;
      setTimeout(() => {
        this.showLoader = false;
        this.router.navigate(['/login/reset-password']);
      }, 1000);
    } else {
      this.toastr.error('Informations invalides');
    }
  }

  backClicked() {
    this.showLoader = true;
    setTimeout(() => {
      this.location.back();
      this.showLoader = false;
    }, 1000);
  }

  authSuccesTask(userName, password) {
    this.authenticationService.getUserInfo(userName).subscribe(
      res => {
        localStorage.setItem('dgbtoken', this.authenticationService.encrypt(password));
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.authenticationService.setCurrentUser(res);
      },
      err => {
        this.toastr.error('Impossible de recuperer les informations sur l\'utilisateur');
      }, () => {
        if (this.returnUrl !== '/') {
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(['/dashboard']);
        }
        this.isLoading = false;
      }
    );
    // this.authenticationService.getUserInfo(userName).subscribe(
    //     res => {
    //     localStorage.setItem('currentUser', JSON.stringify(res));
    //   }
    // );
    // if (this.returnUrl !== '/') {
    //   this.router.navigate([this.returnUrl]);
    // } else {
    //   this.router.navigate(['/dashboard']);
    // }
    // this.isLoading = false;
  }

  forgottenPasswordSubmit() {
    this.submitted = true;
    this.isLoading = true;
    // stop here if form is invalid
    console.log(this.ff.email.value);
    if (this.forgottenPasswordForm.invalid) {
      this.isLoading = false;
      console.log('test login');
      return;
    }
    this.authenticationService.resetUserPassword({userName: this.ff.email.value})
      .subscribe(
        data => {
          this.toastr.success('Vous recevrez votre un code d\'acivation par mail', 'Succès');
          this.userName = this.ff.email.value;
          localStorage.setItem('userName', this.ff.email.value);
          this.isLoading = false;
          this.showLoader = true;
          setTimeout(() => {
            this.showLoader = false;
            this.router.navigate(['/login/otp-login']);
          }, 1000);
        },
        error => {
          console.log(error);
          this.isLoading = false;
          if (error.status === 0) {
            this.toastr.error('Erreur de connexion internet');
            return;
          }
          this.toastr.error('Adresse email inexistante dans le système');
          this.isLoading = false;
        });
  }

  otpSubmit() {
    this.submitted = true;
    this.isLoading = true;
    // stop here if form is invalid
    console.log(this.fOtp.otp.value);

    if (this.otpForm.invalid) {
      this.isLoading = false;
      return;
    }
    if (!this.userName) {
      if (localStorage.getItem('userName')) {
        this.userName = localStorage.getItem('userName');
      } else {
        this.isLoading = false;
        return;
      }
    }
    console.log(this.userName);
    this.authenticationService.resetUserOtp(this.userName, this.fOtp.otp.value)
      .subscribe(
        data => {
          localStorage.setItem('encryptOp', this.authenticationService.encrypt(this.fOtp.otp.value));
          this.toastr.success('Code d\'activation valide', 'Succes');
          this.isLoading = false;
          this.showOtpResetPaswordForm = false;

          this.showLoader = true;
          setTimeout(() => {
            this.showLoader = false;
            this.router.navigate(['/login/reset-password']);
          }, 1000);
        },
        error => {
          console.log(error);
          this.isLoading = false;
          if (error.status === 498) {
            localStorage.setItem('encryptOp', this.authenticationService.encrypt(this.fOtp.otp.value));
            localStorage.setItem('userName', this.userName);
            this.toastr.info('Entrer votre nouveau mot de passe');
            this.showLoader = true;
            setTimeout(() => {
              this.showLoader = false;
              this.router.navigate(['/login/reset-password']);
            }, 1000);
            return;
          } else if (error.status === 0) {
            this.toastr.error('Erreur de connexion internet');
            return;
          } else {
            this.toastr.error('Otp invalide');
            return;
          }
        });
  }

  resetPasswordSubmit() {
    this.submitted = true;
    this.isLoading = true;
    // stop here if form is invalid
    console.log(this.fResetPassword.newPassword.value);

    if (this.fResetPassword.invalid) {
      this.isLoading = false;
      console.log('test login');
      return;
    }

    if (this.fResetPassword.newPassword.value !== this.fResetPassword.confirmPassword.value) {
      this.isNotSamePassword = true;
      this.isLoading = false;
      this.toastr.error('Veuillez entrer des valeurs idendiques');
      return;
    }

    this.userName = localStorage.getItem('userName');

    if (!this.userName) {
      if (localStorage.getItem('userName')) {
        this.userName = localStorage.getItem('userName');
      }
    }

    if (this.resetPasswordForm.status === 'INVALID') {
      this.toastr.info('Votre mot de passe doit etre d\'au moins 6 caractères, contenir au moins un chiffre et au moins une lettre');
      this.toastr.error('Mot de passe invalide');
      this.isLoading = false;
      return;
    }

    this.authenticationService.renewUserPassword(this.userName, this.fResetPassword.newPassword.value, this.oldPassword)
      .subscribe(
        data => {
          this.login(this.userName, this.fResetPassword.newPassword.value);
          // this.isLoading = false;
          // this.toastr.success('Mot de passe reinitialisé avec succès');
          // this.showLoader = true;
          // setTimeout(() => {
          //   this.showLoader = false;
          //   this.router.navigate(['/login']);
          // }, 1000);
        },
        error => {
          this.isLoading = false;
          this.toastr.error('erreur serveur lors de la reinitailsation du mot de passe');
          // this.authErrorTask(error);
        });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [this.usrName, Validators.required],
      password: ['', Validators.required]
    });
    this.forgottenPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    this.otpForm = this.formBuilder.group({
      otp: ['', Validators.required]
    });
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: [
        '',
        [Validators.required, Validators.minLength(6), Validators.pattern('(?=[^a-zA-Z]*[a-zA-Z])(?=\\D*\\d)[A-Za-z\\d]{6,}$')]
      ],
      confirmPassword: [
        '',
        [Validators.required, Validators.minLength(6), Validators.pattern('(?=[^a-zA-Z]*[a-zA-Z])(?=\\D*\\d)[A-Za-z\\d]{6,}$')]
      ]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    if (this.authenticationService.isLogin()) {
      if (this.router.url === '/login') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate([this.returnUrl]);
      }
    }
    // reset login status
    // get return url from route parameters or default to '/'
    // console.log(this.returnUrl);
  }
}
