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
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    this.isLoggedIn = !!token;
    this.username = user;
  }

  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationDialogComponent, {
      width: '280px',
    });
    dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
  }

  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginDialogComponent, {
      width: '280px',
    });
    dialogRef.afterClosed().subscribe(() => this.afterDialogClose());
  }

  afterDialogClose(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');
    if (token && user) {
      this.isLoggedIn = true;
      this.username = user;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = null;
  }
}
