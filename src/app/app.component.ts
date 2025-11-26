import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { FetchApiDataService } from './fetch-api-data.service';
import { UserRegistrationDialogComponent } from './user-registration-dialog/user-registration-dialog.component';
import { UserLoginDialogComponent } from './user-login-dialog/user-login-dialog.component';

@Component({
  selector: 'app-root',
  template: `
    <h1>MyFlix Movies</h1>

    <!-- Login/Register Buttons -->
    <div *ngIf="!isLoggedIn">
      <button (click)="openUserRegistrationDialog()" class="register-btn">Register</button>
      <button (click)="openUserLoginDialog()" class="login-btn">Login</button>
    </div>

    <!-- Logged-in view -->
    <div *ngIf="isLoggedIn">
      <p class="welcome-msg">Welcome, {{ username }}!</p>
      <button (click)="logout()" class="logout-btn">Logout</button>

      <div class="grid">
        <div class="card" *ngFor="let movie of movies">
          <img [src]="movie.imageURL" [alt]="movie.title" />
          <div class="card-body">
            <h3>{{ movie.title }}</h3>
            <p>{{ movie.year }} | {{ movie.genre.name }}</p>
            <p>Director: {{ movie.director.name }}</p>
            <button (click)="toggleFavorite(movie._id)">
              {{ isFavorite(movie._id) ? 'Remove from Favorites' : 'Add to Favorites' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
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

      .register-btn {
        display: block;
        margin: 10px auto 20px auto;
        padding: 10px 20px;
        font-size: 1rem;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .register-btn:hover {
        background-color: #1e7e34;
      }

      .login-btn {
        display: block;
        margin: 0 auto 20px auto;
        padding: 10px 20px;
        font-size: 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .login-btn:hover {
        background-color: #0056b3;
      }

      .welcome-msg {
        text-align: center;
        font-size: 1.2rem;
        margin-bottom: 10px;
      }

      .logout-btn {
        display: block;
        margin: 0 auto 20px auto;
        padding: 10px 20px;
        font-size: 1rem;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .logout-btn:hover {
        background-color: #a71d2a;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: string[] = [];
  isLoggedIn = false;
  username: string | null = null;

  constructor(private fetchApiData: FetchApiDataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('username');

    this.isLoggedIn = !!token;
    this.username = user;

    if (this.isLoggedIn) {
      this.loadMovies();
      this.loadFavorites();
    }
  }

  loadMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp) => (this.movies = resp),
      error: (err) => console.error('Error fetching movies:', err),
    });
  }

  loadFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (resp) => (this.favoriteMovies = resp.favoriteMovies || []),
      error: (err) => console.error('Error fetching favorites:', err),
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.fetchApiData.deleteFavoriteMovie(movieId).subscribe({
        next: () =>
          (this.favoriteMovies = this.favoriteMovies.filter((id) => id !== movieId)),
        error: (err) => console.error('Error removing favorite:', err),
      });
    } else {
      this.fetchApiData.addFavoriteMovie(movieId).subscribe({
        next: () => this.favoriteMovies.push(movieId),
        error: (err) => console.error('Error adding favorite:', err),
      });
    }
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationDialogComponent, { width: '400px' });
  }

  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginDialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(() => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('username');

      if (token && user) {
        this.isLoggedIn = true;
        this.username = user;
        this.loadMovies();
        this.loadFavorites();
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.username = null;
    this.movies = [];
    this.favoriteMovies = [];
  }
}
