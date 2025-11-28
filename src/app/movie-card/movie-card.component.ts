import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];
  username: string | null = null;

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.loadMovies();
    this.loadFavorites();
  }

  /** CARICA TUTTI I FILM DAL BACKEND */
  loadMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
      },
      error: (err) => console.error('Errore nel caricamento dei film:', err),
    });
  }

  /** CARICA I PREFERITI DELL'UTENTE */
  loadFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (resp) => {
        this.favoriteMovies = resp.favoriteMovies || [];
      },
      error: (err) =>
        console.error('Errore nel caricamento dei preferiti:', err),
    });
  }

  /** CONTROLLA SE UN FILM È NEI PREFERITI */
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  /** AGGIUNGI / RIMUOVI PREFERITO */
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.removeFavorite(movieId);
    } else {
      this.addFavorite(movieId);
    }
  }

  private addFavorite(movieId: string): void {
    this.fetchApiData.addFavoriteMovie(movieId).subscribe({
      next: () => this.favoriteMovies.push(movieId),
      error: (err) => console.error('Errore aggiunta preferito:', err),
    });
  }

  private removeFavorite(movieId: string): void {
    this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
      next: () => {
        this.favoriteMovies = this.favoriteMovies.filter(
          (id) => id !== movieId
        );
      },
      error: (err) => console.error('Errore rimozione preferito:', err),
    });
  }
}
