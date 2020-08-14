import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {

  private messageSource = new BehaviorSubject('Tableau de bord');
  currentMessage = this.messageSource.asObservable();

  constructor() {
  }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
