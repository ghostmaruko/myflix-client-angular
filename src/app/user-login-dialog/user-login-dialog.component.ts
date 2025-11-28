import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Login</h2>

    <mat-dialog-content>
      <form #loginForm="ngForm">
        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Username</mat-label>
          <input
            matInput
            name="username"
            [(ngModel)]="loginData.username"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Password</mat-label>
          <input
            matInput
            type="password"
            name="password"
            [(ngModel)]="loginData.password"
            required
          />
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" (click)="loginUser()">
        Login
      </button>
    </mat-dialog-actions>
  `,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class UserLoginDialogComponent {
  loginData = { username: '', password: '' };

  constructor(
    public dialogRef: MatDialogRef<UserLoginDialogComponent>,
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (result) => {
        console.log('Login successful', result);

        // Salva token e username
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('token', result.token);

        // Chiudi dialog
        this.dialogRef.close();

        // Reindirizza a /movies
        this.router.navigate(['movies']);
      },
      error: (error) => console.error('Login error:', error),
    });
  }
}
