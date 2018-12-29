import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userPipe'
})

export class userPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {

    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }
    var still = [];
    items.forEach(element => {
      if (element.nom != value)
        still.push(element)
    });

    return still;
  }
}
