import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Service responsabile della gestione dello stato di autenticazione dell'utente.
 *
 * Mantiene un `BehaviorSubject` che riflette se l'utente è attualmente
 * loggato o meno, e fornisce metodi per login e logout.
 *
 * @service
 */
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  /**
   * BehaviorSubject che rappresenta lo stato di login corrente.
   * Il valore iniziale è determinato dalla presenza di un token nel `localStorage`.
   */
  private loggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );

  /**
   * Observable a cui i componenti possono sottoscriversi per reagire
   * ai cambiamenti dello stato di autenticazione.
   */
  isLoggedIn$ = this.loggedIn.asObservable();

  /**
   * Imposta lo stato dell'utente come autenticato.
   *
   * Viene tipicamente chiamato dopo un login avvenuto con successo.
   */
  login(): void {
    this.loggedIn.next(true);
  }

  /**
   * Esegue il logout dell'utente:
   * - rimuove token e username dal localStorage
   * - aggiorna lo stato osservabile di autenticazione
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedIn.next(false);
  }
}
