import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import backendUrl from '../../../assets/backendUrl.json';

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  httpOptions: { headers: HttpHeaders; };

  selectedDossier: any = {};
  selectedDossierSource = new BehaviorSubject(this.selectedDossier);

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  getAllDossiers(): any {

    return this.http.get<any>(backendUrl.dossier + 'dossiers', this.authService.getMainHeader());
  }

  getById(id: number) {
    return this.http.get(backendUrl.dossier + id, this.authService.getMainHeader());
  }

  create(dossier: any) {
    return this.http.post<any>(backendUrl.dossier + 'dossier/create', dossier, this.authService.getMainHeader());
  }

  update(dossier: any) {
    // const httpOptions: any = {
    //   responseType: 'text' as 'text'
    // };
    return this.http.post<any>(backendUrl.dossier + 'dossier/update', dossier, this.authService.getMainHeader());
  }

  delete(id: number) {
    return this.http.delete(backendUrl.content + id, this.authService.getMainHeader());
  }

  getMainHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
        Dossier: ''
      })
    };
  }

  setSelectedDossier(selectedDossier) {
    this.selectedDossierSource.next(selectedDossier);
  }

  getSelectedDossier(): Observable<any> {
    return this.selectedDossierSource.asObservable();
  }

  clearSelectedDossier() {
    this.selectedDossierSource.next(null);
  }
}
