import { Pipe } from "@angular/core";

@Pipe({
  name: 'upperCase',
  standalone: true,
})
export class UpperCasePipe {
  transform(value: string): string {
    return value.toUpperCase();
  }
}