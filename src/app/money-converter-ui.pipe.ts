import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneyConverterUI',
  standalone: true
})
export class MoneyConverterUIPipe implements PipeTransform {
  transform(value: number): string {
    if (value !== undefined && value !== null) {
      const euros = value / 100;
      return euros.toFixed(2) + '€';
    } else {
      return '';
    }
  }

}
