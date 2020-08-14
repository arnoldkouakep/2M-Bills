import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import backendUrl from '../../../assets/backendUrl.json';

@Injectable({
  providedIn: 'root'
})
export class NavireService {

  httpOptions: { headers: HttpHeaders; };

  selectedNavire: any = {};
  selectedNavireSource = new BehaviorSubject(this.selectedNavire);

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  getAllNavires(): any {

    return this.http.get<any>(backendUrl.navire + 'navires', this.authService.getMainHeader());
  }

  getById(id: number) {
    return this.http.get(backendUrl.navire + id, this.authService.getMainHeader());
  }

  create(navire: any) {
    return this.http.post<any>(backendUrl.navire + 'navire/create', navire, this.authService.getMainHeader());
  }

  update(navire: any) {
    // const httpOptions: any = {
    //   responseType: 'text' as 'text'
    // };
    return this.http.post<any>(backendUrl.navire + 'navire/update', navire, this.authService.getMainHeader());
  }

  delete(id: number) {
    return this.http.delete(backendUrl.content + id, this.authService.getMainHeader());
  }

  getMainHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
        Navire: ''
      })
    };
  }

  setSelectedNavire(selectedNavire) {
    this.selectedNavireSource.next(selectedNavire);
  }

  getSelectedNavire(): Observable<any> {
    return this.selectedNavireSource.asObservable();
  }

  clearSelectedNavire() {
    this.selectedNavireSource.next(null);
  }
}
