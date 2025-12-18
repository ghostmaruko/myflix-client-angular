import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-login-dialog',
  standalone: true,
  templateUrl: './user-login-dialog.component.html',
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
    private fetchApiData: FetchApiDataService
  ) {}

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (result) => {
        console.log('Login successful', result);
        localStorage.setItem('username', result.user.username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Login failed');
      },
    });
  }
}
