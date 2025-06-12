import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-observables-demo-page',
  imports: [],
  templateUrl: './observables-demo-page.component.html',
  styleUrl: './observables-demo-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObservablesDemoPageComponent {
  resultat = '';
  resultat2 = '';
  resultat3!: string;
  demarrer() {
    const monObservable$ = new Observable<string>((observer) => {
      observer.next('Première valeur');
      observer.next('Deuxième valeur');
      observer.next('Troisième valeur');

      observer.complete();
      observer.error("Une erreur s'est produite");
      observer.next('Quatrième valeur');
    });

    monObservable$.subscribe({
      next: (valeur) => {
        this.resultat += `Valeur reçue : ${valeur}\n`;
      },
      error: (err) => {
        this.resultat += `Erreur : ${err}\n`;
      },
      complete: () => {
        this.resultat += 'Observable terminé.\n';
      },
    });

    const monObserevable2$ = new Observable<number>((observer) => {
      observer.next(Math.random());
      observer.complete();
    });

    monObserevable2$.subscribe({
      next: (valeur) => {
        this.resultat2 += `Valeur aléatoire reçue : ${valeur}\n`;
      },
    });

    const mySubject$ = new Subject<number>();

    mySubject$.subscribe({
      next: (valeur) => {
        this.resultat3 += `Valeur du Subject reçue : ${valeur}\n`;
        console.log(valeur);
      },
    });
    mySubject$.subscribe({
      next: (valeur) => {
        this.resultat3 += `Valeur du Subject reçue : ${valeur}\n`;
        console.log(valeur);
      },
    });
    mySubject$.next(Math.random());
    mySubject$.subscribe({
      next: (valeur) => {
        this.resultat3 += `Valeur du Subject reçue : ${valeur}\n`;
        console.log(valeur);
      },
    });
    mySubject$.next(10);

    const subject = new BehaviorSubject(0); // 0 is the initial value

    subject.subscribe({
      next: (v) => console.log(`observerA: ${v}`),
    });

    subject.next(1);
    subject.next(2);

    subject.subscribe({
      next: (v) => console.log(`observerB: ${v}`),
    });
  }
}
