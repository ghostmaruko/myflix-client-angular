import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * UserProfileComponent — visualizza e gestisce il profilo utente,
 * inclusi aggiornamenti dati e lista film preferiti.
 *
 * @component
 */
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
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  /** Dati dell’utente loggato. */
  userData: any = {};
  /** Lista dei film preferiti dell’utente. */
  favoriteMovies: any[] = [];
  /** Lista completa di tutti i film. */
  allMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  /** Inizializza il componente caricando dati utente e film. */
  ngOnInit(): void {
    this.loadUser();
  }

  /** Carica dati utente dal backend. */
  loadUser(): void {
    this.fetchApiData.getUser().subscribe({
      next: (user) => {
        this.userData = user;
        this.loadAllMovies();
      },
      error: (err) => console.error(err),
    });
  }

  /** Carica tutti i film dal backend e filtra quelli preferiti. */
  loadAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies: any[]) => {
        this.allMovies = movies;

        if (!this.userData.favoriteMovies) {
          this.favoriteMovies = [];
          return;
        }

        // FILTRIAMO I PREFERITI DALLA LISTA COMPLETA
        this.favoriteMovies = this.allMovies.filter((m) =>
          this.userData.favoriteMovies.includes(m._id)
        );
      },
      error: (err) => console.error(err),
    });
  }

  /** Rimuoviamo i film preferiti con il <3. */
  removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
      next: () => {
        // aggiorniamo lista ID
        this.userData.favoriteMovies = this.userData.favoriteMovies.filter(
          (id: string) => id !== movieId
        );

        // aggiorniamo lista film renderizzati
        this.favoriteMovies = this.favoriteMovies.filter(
          (movie) => movie._id !== movieId
        );
      },
      error: (err) => console.error(err),
    });
  }

  /** Controlla se il film è tra i preferiti dell’utente */
  isFavorite(movieId: string): boolean {
    return this.userData.FavoriteMovies?.includes(movieId);
  }

  /** Aggiunge o rimuove un film dai preferiti */
  toggleFavorite(movieId: string): void {
    if (!this.userData.FavoriteMovies) {
      this.userData.FavoriteMovies = [];
    }

    if (this.isFavorite(movieId)) {
      // Rimuovi dai preferiti
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
        next: () => {
          this.userData.FavoriteMovies = this.userData.FavoriteMovies.filter(
            (id: string) => id !== movieId
          );
        },
        error: (err) => console.error(err),
      });
    } else {
      // Aggiungi ai preferiti
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: () => {
          this.userData.FavoriteMovies.push(movieId);
        },
        error: (err) => console.error(err),
      });
    }
  }

  /** Rimuove un film dai preferiti e aggiorna la lista */
  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
      next: () => {
        // Aggiorna la lista favoriteMovies filtrando direttamente l'array usato dal template
        this.favoriteMovies = this.favoriteMovies.filter(
          (movie) => movie._id !== movieId
        );

        // Aggiorna anche userData.FavoriteMovies se serve
        if (this.userData.FavoriteMovies) {
          this.userData.FavoriteMovies = this.userData.FavoriteMovies.filter(
            (id: string) => id !== movieId
          );
        }
      },
      error: (err) => console.error(err),
    });
  }

  /** Aggiorna i dati dell’utente. */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe({
      next: (result) => {
        alert('Profile updated!');
        localStorage.setItem('username', result.username);
      },
      error: (err) => console.error(err),
    });
  }

  /** Elimina l’utente dopo conferma. */
  deleteUser(): void {
    if (!confirm('Are you sure?')) return;

    this.fetchApiData.deleteUser().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/welcome']);
      },
      error: (err) => console.error(err),
    });
  }
}
