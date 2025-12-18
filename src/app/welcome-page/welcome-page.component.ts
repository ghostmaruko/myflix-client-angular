import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { UserLoginDialogComponent } from '../user-login-dialog/user-login-dialog.component';
import { UserRegistrationDialogComponent } from '../user-registration-dialog/user-registration-dialog.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MovieCardComponent,
  ],
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent implements OnInit {
  isLoggedIn = false;
  username: string | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.updateLoginState();
  }

  /** Aggiorna stato login */
  private updateLoginState(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    this.isLoggedIn = !!token;
    this.username = user;
  }

  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationDialogComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'registered') {
        // Delay per far chiudere completamente il dialog di registrazione
        setTimeout(() => {
          this.openUserLoginDialog();
        }, 100);
      }
    });
  }

  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginDialogComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateLoginState();
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.updateLoginState();
  }
}
