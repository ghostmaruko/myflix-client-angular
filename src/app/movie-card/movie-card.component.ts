import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FetchApiDataService } from '../fetch-api-data.service';

/**
 * MovieCardComponent — visualizza le card dei film, con pulsanti per
 * dettagli e gestione dei film preferiti.
 *
 * @component
 */
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /** Lista di tutti i film. */
  movies: any[] = [];

  /** Lista degli ID dei film preferiti dall’utente. */
  favoriteMovies: string[] = [];

  /** Username dell’utente loggato, letto dal localStorage. */
  username: string | null = null;

  /** Film selezionato per mostrare overlay o dialog. */
  selectedMovie: any = null;

  /**
   * @param fetchApiData — servizio per chiamate API
   */
  constructor(private fetchApiData: FetchApiDataService) {}

  /** Inizializza il componente caricando film e preferiti. */
  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.loadMovies();
    this.loadFavorites();
  }

  /** Carica tutti i film dal backend. */
  loadMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies: any[]) => (this.movies = movies),
      error: (err: any) =>
        console.error('Errore nel caricamento dei film:', err),
    });
  }

  /** Carica i film preferiti dell’utente dal backend. */
  loadFavorites(): void {
    this.fetchApiData.getUser().subscribe({
      next: (user: any) => {
        this.favoriteMovies = user.FavoriteMovies || [];
      },
      error: (err: any) =>
        console.error('Errore nel caricamento dei preferiti:', err),
    });
  }

  /**
   * Controlla se un film è tra i preferiti.
   * @param movieId — ID del film
   * @returns true se il film è preferito
   */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /**
   * Aggiunge o rimuove un film dai preferiti.
   * @param movieId — ID del film da aggiornare
   */
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
        next: () => {
          this.favoriteMovies = this.favoriteMovies.filter(
            (id) => id !== movieId
          );
        },
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: () => {
          this.favoriteMovies.push(movieId);
        },
      });
    }
  }

  /**
   * Mostra i dettagli del film selezionato.
   * @param movie — film selezionato
   */
  openMovieDetails(movie: any): void {
    this.selectedMovie = {
      ...movie,
      isFavorite: this.isFavorite.bind(this),
      onFavorite: this.toggleFavorite.bind(this),
    };
  }

  /** Chiude i dettagli del film. */
  closeMovieDetails(): void {
    this.selectedMovie = null;
  }
}
