import { Pipe, PipeTransform } from '@angular/core';
import { UserInfoModel } from '../models/user';

@Pipe({
  name: 'userMishapPipe'
})
export class userMishapPipe implements PipeTransform {

  transform(field: string, items: UserInfoModel[], value: string): string {

    if (!items) {
      return field;
    }
    if (!field || !value) {
      return " ";
    }
    for (let entry of items) {
      if (entry.nom.includes(value))
        return entry.avatar;
    }
    return field;
  }

}
