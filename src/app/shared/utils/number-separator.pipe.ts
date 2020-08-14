import {Pipe, PipeTransform} from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'numberSeparator'
})

export class NumberSeparatorPipe implements PipeTransform {

  constructor(private decimalPipe: DecimalPipe) {
  }

  transform(value: any, field?: string, items?: any): any {
    if (value < 1000) {
      return value;
    } else {
      return this.decimalPipe.transform(value, field);
    }
  }
}
