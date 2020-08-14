import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Router} from '@angular/router';
import backendUrl from '../../../assets/backendUrl.json';
import * as crypto from 'crypto-js';
import {User} from '../models/user.model';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthenticationService {

  auth: any = '';
  secretKey = 'BeniWin2020@KSA';
  authSource = new BehaviorSubject(this.auth);
  currentUserSource = new BehaviorSubject<any>(null);
  public currentUser: Observable<User>;
  isLogout = false;
  private currentUserSubject: BehaviorSubject<User>;
  private jsonURL = '/../../../assets/data.json';

  constructor(private http: HttpClient, private router: Router) {
    // console.log(backendUrl.content);
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public getJSON(): Observable<any> {
    return this.http.get('./assets/data.json');
  }

  getProjectByName(name: string) {
    return this.getJSON().pipe(map(users => {
      const us = users.data.filter(user => user.firstName === name);
      console.log('User_Test', us);
      return (us.length > 0) ? us[0] : null;
    }));
  }

  login(username: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body'
    };
    return this.getProjectByName(username).pipe(
      map(user => {
        // console.log('user : ', user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('authDBF', '123456789'); // user.headers.get('authorization'));
        this.isLogin(true); // user.headers.get('authorization'));
      }));
  }


  encrypt(value: string): string {
    return crypto.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt: string) {
    return crypto.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(crypto.enc.Utf8);
  }

  getUserInfo(userName: string) {
    return this.getProjectByName(userName); // .map(res => res.json())
    // .filter(<IUser>(x) => x.id > 2);
    // this.http.get<any>(backendUrl.content + '/userInfos/' + userName, this.getHeader());
  }

  getCurrentUser(): Observable<any> {
    this.currentUserSource = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    return this.currentUserSource.asObservable();
  }

  setCurrentUser(currentUser) {
    // localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.currentUserSource.next(currentUser);
  }

  getUserInfos(email): Observable<any> {
    return this.http.get<any>(backendUrl.content + '/userInfos/' + email, this.getHeader());
  }

  getHeader(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.getAuth() || '',
      })
    };
  }

  getMainHeader(): any {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa('beni' + ':' + 'admin'),
        // 'Access-Control-Allow-Origin': 'http://localhost:4200',
        // 'Access-Control-Allow-Credentials': 'true',
        // 'Access-Control-Allow-Methods': 'GET, POST'
        // // , PATCH, DELETE, PUT, OPTIONS'
        // 'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
        // // Authorization: this.getAuth() || '', // ici c'est le token que je dois envoyer dans l'entete il faut remettre ceci plutard
      })
    };
  }

  // OLD
  getAuth(): any {
    // console.log(localStorage.getItem('authDBF'));
    return localStorage.getItem('authDBF');
  }

  isLogin(auth?): boolean {
    if (auth || localStorage.getItem('authDBF')) {
      // console.log('test-auth: ' + auth);
      return true;
    }
    return false; // false; : Modifier pour les tests.
  }

  authenticatedUser(password): Observable<any> {
    return this.http.post(backendUrl.content + '/renewPassword', password, this.getHeader());
  }

  resetUserOtp(userName, password): Observable<any> {
    console.log(userName);
    console.log(password);
    return this.http.get(backendUrl.content + '/newEncryptedToken', {
      headers: new HttpHeaders({
        // 'BANK': 'Banque 1',
        // 'BRANCH': 'Caisse 1',
        // 'PRODUCT': '',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(userName + ':' + password)
      }),
      responseType: 'text' as 'text',
    });
  }

  renewUserPassword(userName, password, oldPassword): Observable<any> {
    console.log(userName);
    console.log(password);
    console.log(oldPassword);
    return this.http.post(backendUrl.content + '/renewPassword', {password}, {
      headers: new HttpHeaders({
        // 'BANK': 'Banque 1',
        // 'BRANCH': 'Caisse 1',
        // 'PRODUCT': '',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(userName + ':' + oldPassword)
      })
    });
  }

  resetUserPassword(email: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    // return this.http.post(backendUrl.content + '/resetUserPassword', email, this.getHeader());
    return this.http.post(backendUrl.content + '/resetUserPassword', email, httpOptions);
  }

  clearSession() {
    // this.authSource.next(this.auth);
    localStorage.removeItem('authDBF');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login/renew-session']);
  }

  logout() {
    this.auth = undefined;
    this.isLogout = true;
    // this.authSource.next(this.auth);
    localStorage.removeItem('authDBF');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
    this.currentUserSubject.next(null);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
