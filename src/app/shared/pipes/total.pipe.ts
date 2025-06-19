import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'total',
})
export class TotalPipe implements PipeTransform {
  transform(unit: number, quantity: number): number {
    return unit * quantity;
  }
}
// pipe instancié une seule fois dans le dom quand utilisé.
// pure par defaut, il n'est recalculé que si unit ou quantity changent
