import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateConvert'
})
export class DateConvertPipe implements PipeTransform {

  transform(d: string): string {
    const date = new Date(d);
    date.toLocaleString('fr-FR', {hour: 'numeric', hour12: true});
    const monthNames = [
      'Janv', 'Févr', 'Mars',
      'Avr', 'Mai', 'Juin', 'Juill',
      'août', 'Sep', 'Oct',
      'Nov', 'Dec'
    ];
    const month = date.getMonth();
    // date.getDayInMonth(date.getMonth(), date.getFullYear());
    const year = date.getFullYear();
    const day = date.getDate();
    const hours = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    return day + ' ' + monthNames[month] + ' ' + year + ' à ' + hours + ':' + min + ':' + sec;
  }

}
