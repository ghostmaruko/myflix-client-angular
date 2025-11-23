import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <h1>MyFlix Movies</h1>
    <div class="grid">
      <div class="card" *ngFor="let movie of movies">
        <img [src]="movie.imageURL" [alt]="movie.title" />
        <div class="card-body">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.year }} | {{ movie.genre.name }}</p>
          <p>Director: {{ movie.director.name }}</p>
          <button (click)="toggleFavorite(movie._id)">
            {{
              isFavorite(movie._id)
                ? 'Remove from Favorites'
                : 'Add to Favorites'
            }}
          </button>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  providers: [FetchApiDataService],
  styles: [
    `
      h1 {
        text-align: center;
        margin-bottom: 20px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 20px;
        padding: 0 20px;
      }
      .card {
        border: 1px solid #ccc;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
      }
      .card:hover {
        transform: scale(1.05);
      }
      .card img {
        width: 100%;
        height: 300px;
        object-fit: cover;
      }
      .card-body {
        padding: 10px;
      }
      .card-body h3 {
        margin: 0 0 5px 0;
        font-size: 1.1rem;
      }
      .card-body p {
        margin: 2px 0;
        font-size: 0.9rem;
        color: #555;
      }
      .card-body button {
        margin-top: 5px;
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #007bff;
        color: white;
        font-size: 0.9rem;
      }
      .card-body button:hover {
        background-color: #0056b3;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    // Simula login (metti qui il tuo username e token valido ottenuto dal backend)
    localStorage.setItem('username', 'yourUsername');
    localStorage.setItem('token', 'yourJWTtoken');

    // Carica tutti i film
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp) => {
        console.log('Movies:', resp);
        this.movies = resp;
      },
      error: (err) => console.error('Error fetching movies:', err),
    });

    // Carica i film preferiti dell'utente
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (resp) => {
        this.favoriteMovies = resp.favoriteMovies || [];
        console.log('Favorite movies:', this.favoriteMovies);
      },
      error: (err) => console.error('Error fetching favorites:', err),
    });
  }

  // Controlla se un film è tra i preferiti
  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  // Aggiunge o rimuove dai preferiti
  toggleFavorite(movieId: string) {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
        next: () => {
          this.favoriteMovies = this.favoriteMovies.filter(
            (id) => id !== movieId
          );
          console.log('Removed from favorites:', movieId);
        },
        error: (err) => console.error('Error removing favorite:', err),
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: () => {
          this.favoriteMovies.push(movieId);
          console.log('Added to favorites:', movieId);
        },
        error: (err) => console.error('Error adding favorite:', err),
      });
    }
  }
}
