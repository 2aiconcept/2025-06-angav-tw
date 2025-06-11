import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SignalDataService {
  version = signal(1);
  increment() {
    this.version.set(this.version() + 1);
  }
}
