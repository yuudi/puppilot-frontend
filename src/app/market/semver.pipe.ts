import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'semver',
  standalone: true,
})
export class SemverPipe implements PipeTransform {
  transform(value: number | string | (number | string)[]): string {
    switch (typeof value) {
      case 'number':
        return value.toString();
      case 'string':
        return value;
      default:
        return value.join('.');
    }
  }
}
