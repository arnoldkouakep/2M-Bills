import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'rowFilter'
})

export class RowFilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: any): any[] {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    value = value.toString();
    return items.filter(singleItem => singleItem[field]
      .toString()
      .toLowerCase()
      .includes(value.toLowerCase()));
  }
}
