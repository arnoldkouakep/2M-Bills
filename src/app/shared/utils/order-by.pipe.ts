import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(tab: Array<any>, arg: any): Array<any> {
    return tab.sort((a, b) => a.arg - b.arg);
  }

}
