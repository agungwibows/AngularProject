import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enigma'
})
export class EnigmaPipe implements PipeTransform {
  transform(val: string) : string {
    var a = parseInt(val);
    return '+62'+a;
  }

}
