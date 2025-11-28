import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { FetchApiDataService } from '../fetch-api-data.service';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userData: any = {};
  favoriteMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadFavoriteMovies();
  }

  /** Carica dati utente */
  loadUserData(): void {
    this.fetchApiData.getUser().subscribe({
      next: (user) => (this.userData = user),
      error: (err) => console.error('Errore caricamento dati utente:', err),
    });
  }

  /** Carica film preferiti */
  loadFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (resp) => (this.favoriteMovies = resp || []),
      error: (err) => console.error('Errore caricamento preferiti:', err),
    });
  }

  /** Aggiorna dati utente */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe({
      next: (result) => {
        console.log('Dati aggiornati', result);
        localStorage.setItem('username', result.username);
        alert('Profile updated successfully!');
      },
      error: (err) => console.error('Errore aggiornamento:', err),
    });
  }

  /** Deregistrazione */
  deleteUser(): void {
    if (!confirm('Are you sure you want to delete your account?')) return;

    this.fetchApiData.deleteUser().subscribe({
      next: () => {
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        alert('Account deleted!');
        this.router.navigate(['/welcome']);
      },
      error: (err) => console.error('Errore cancellazione account:', err),
    });
  }

  /** Apri modale dettagli film */
  openMovieDetails(movie: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        ...movie,
        onFavorite: (id: string) => this.toggleFavorite(id),
        isFavorite: (id: string) => this.isFavorite(id),
      },
      width: '700px',
      maxHeight: '90vh',
    });
  }

  /** Controlla se film è nei preferiti */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /** Aggiungi / rimuovi dai preferiti */
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
        next: () =>
          (this.favoriteMovies = this.favoriteMovies.filter(
            (id) => id !== movieId
          )),
        error: (err) => console.error('Errore rimozione preferito:', err),
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: () => this.favoriteMovies.push(movieId),
        error: (err) => console.error('Errore aggiunta preferito:', err),
      });
    }
  }
}
