import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  // true se loggato, false se non loggato
  private loggedIn = new BehaviorSubject<boolean>(
    !!localStorage.getItem('token')
  );
  isLoggedIn$ = this.loggedIn.asObservable();

  login(): void {
    this.loggedIn.next(true);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.loggedIn.next(false);
  }
}
