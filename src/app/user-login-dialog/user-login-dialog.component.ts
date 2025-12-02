import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

/**
 * UserLoginDialogComponent — dialog per login utente.
 *
 * @component
 */
@Component({
  selector: 'app-user-login-dialog',
  standalone: true,
  template: `...`,
  imports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class UserLoginDialogComponent {
  /** Dati bindati al form di login. */
  loginData = { username: '', password: '' };

  /**
   * @param dialogRef — riferimento al dialog aperto
   * @param fetchApiData — servizio per chiamate API
   * @param router — router Angular per navigazione
   */
  constructor(
    public dialogRef: MatDialogRef<UserLoginDialogComponent>,
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  /**
   * Effettua il login dell’utente.
   * Salva token e username su localStorage e chiude il dialog.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe({
      next: (result) => {
        console.log('Login successful', result);

        localStorage.setItem('username', result.user.username);
        localStorage.setItem('token', result.token);

        this.dialogRef.close();
        this.router.navigate(['movies']);
      },
      error: (error) => console.error('Login error:', error),
    });
  }
}
