import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-registration-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>Register</h2>

    <mat-dialog-content>
      <form #registerForm="ngForm">
        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Username</mat-label>
          <input
            matInput
            name="username"
            [(ngModel)]="userData.username"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Password</mat-label>
          <input
            matInput
            type="password"
            name="password"
            [(ngModel)]="userData.password"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Email</mat-label>
          <input
            matInput
            type="email"
            name="email"
            [(ngModel)]="userData.email"
            required
          />
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Birthday</mat-label>
          <input
            matInput
            type="date"
            name="birthday"
            [(ngModel)]="userData.birthday"
          />
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" (click)="registerUser()">
        Register
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
export class UserRegistrationDialogComponent {
  userData = { username: '', password: '', email: '', birthday: '' };

  constructor(
    public dialogRef: MatDialogRef<UserRegistrationDialogComponent>,
    private fetchApiData: FetchApiDataService
  ) {}

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: (result) => {
        console.log('Registration successful', result);
        this.dialogRef.close();
      },
      error: (error) => console.error('Registration error:', error),
    });
  }
}
