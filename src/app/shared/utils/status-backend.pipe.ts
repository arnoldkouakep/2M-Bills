import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusBackend'
})

export class StatusBackendPipe implements PipeTransform {

  transform(items: any, field?: string, value?: any): any {
    switch (items) {
      case null:
        return '';
      case 'SUCCESS':
        return 'Succès';
      case 'CANCELED':
        return 'Annulé';
      case 'FAILED':
        return 'Echec';
      case 'NOT_PROCESSED':
        return 'En attente';
      case 'Ouvert':
        return 'Ouvert';
      case 'Fermé':
        return 'Fermé';
      case 'Married':
        return 'Marié(e)';
      case 'Single':
        return 'Célibataire';
      default:
        return '#REF: ' + items;
    }
  }
}
