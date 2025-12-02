import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserLoginDialogComponent } from '../user-login-dialog/user-login-dialog.component';
import { UserRegistrationDialogComponent } from '../user-registration-dialog/user-registration-dialog.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

/**
 * WelcomePageComponent — pagina iniziale dell’app.
 * Mostra pulsanti di login/registrazione e lista di film.
 *
 * @component
 */
@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MovieCardComponent],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  /** Stato login dell’utente. */
  isLoggedIn = false;
  /** Username dell’utente loggato. */
  username: string | null = null;

  constructor(private dialog: MatDialog) {}

  /** Controlla se l’utente è loggato al caricamento della pagina. */
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    this.isLoggedIn = !!token;
    this.username = user;
  }

  /** Apre dialog di registrazione utente. */
  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationDialogComponent, {
      width: '280px',
    });
    dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
  }

  /** Apre dialog di login utente. */
  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginDialogComponent, {
      width: '280px',
    });
    dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
  }

  /** Aggiorna lo stato dopo chiusura di un dialog. */
  afterDialogClose(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    if (token && user) {
      this.isLoggedIn = true;
      this.username = user;
    }
  }

  /** Esegue logout dell’utente rimuovendo token e username. */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = null;
  }
}
