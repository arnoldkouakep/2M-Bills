import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from './auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import backendUrl from '../../../assets/backendUrl.json';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  httpOptions: { headers: HttpHeaders; };

  selectedClient: any = {};
  selectedClientSource = new BehaviorSubject(this.selectedClient);

  constructor(private http: HttpClient,
              private authService: AuthenticationService) {
  }

  getAllClients(): any {

    return this.http.get<any>(backendUrl.dossier + 'clients', this.authService.getMainHeader());
  }

  getById(id: number) {
    return this.http.get(backendUrl.dossier + 'client/' + id, this.authService.getMainHeader());
  }

  create(client: any) {
    return this.http.post<any>(backendUrl.dossier + 'client/create', client, this.authService.getMainHeader());
  }

  update(client: any) {
    // const httpOptions: any = {
    //   responseType: 'text' as 'text'
    // };
    return this.http.post<any>(backendUrl.dossier + 'client/update', client, this.authService.getMainHeader());
  }

  delete(id: string) {
    return this.http.delete(backendUrl.content + id, this.authService.getMainHeader());
  }

  getMainHeader() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: '',
        Client: ''
      })
    };
  }

  setSelectedClient(selectedClient) {
    this.selectedClientSource.next(selectedClient);
  }

  getSelectedClient(): Observable<any> {
    return this.selectedClientSource.asObservable();
  }

  clearSelectedClient() {
    this.selectedClientSource.next(null);
  }
}
