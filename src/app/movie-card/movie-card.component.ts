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
  
  selectedMovie: any = null; // per overlay

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
    this.loadMovies();
    this.loadFavorites();
  }

  loadMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies) => (this.movies = movies),
      error: (err) => console.error('Errore nel caricamento dei film:', err),
    });
  }

  loadFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (resp) => (this.favoriteMovies = resp.favoriteMovies || []),
      error: (err) => console.error('Errore nel caricamento dei preferiti:', err),
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe(() => {
        this.favoriteMovies = this.favoriteMovies.filter((id) => id !== movieId);
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe(() => {
        this.favoriteMovies.push(movieId);
      });
    }
  }

  openMovieDetails(movie: any): void {
    this.selectedMovie = {
      ...movie,
      isFavorite: this.isFavorite.bind(this),
      onFavorite: this.toggleFavorite.bind(this),
    };
  }

  closeMovieDetails(): void {
    this.selectedMovie = null;
  }
}
