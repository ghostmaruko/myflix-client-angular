import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from './fetch-api-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <h1>Test MyFlix API</h1>
    <div class="grid">
      <div class="card" *ngFor="let movie of movies">
        <img [src]="movie.imageURL" [alt]="movie.title" />
        <div class="card-body">
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.year }} | {{ movie.genre.name }}</p>
          <p>Director: {{ movie.director.name }}</p>
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
    `,
  ],
})
export class AppComponent implements OnInit {
  movies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (resp) => {
        console.log('Movies:', resp);
        this.movies = resp;
      },
      error: (err) => console.error('Error fetching movies:', err),
    });
  }
}
