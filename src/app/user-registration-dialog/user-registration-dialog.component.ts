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
  templateUrl: './user-registration-dialog.component.html',
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
      next: () => {
        console.log('Registration successful');
        this.dialogRef.close('registered');
      },
      error: (error) => {
        console.error('Registration error:', error);
        alert('Registration failed');
      },
    });
  }
}
