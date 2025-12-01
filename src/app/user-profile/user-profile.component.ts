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
  userData: any = {};
  favoriteMovies: any[] = [];
  allMovies: any[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.fetchApiData.getUser().subscribe({
      next: (user) => {
        this.userData = user;
        this.loadAllMovies();
      },
      error: (err) => console.error(err),
    });
  }

  loadAllMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (movies) => {
        this.allMovies = movies;

        // FILTRIAMO I PREFERITI DALLA LISTA COMPLETA
        this.favoriteMovies = this.allMovies.filter((m) =>
          this.userData.FavoriteMovies.includes(m._id)
        );
      },
      error: (err) => console.error(err),
    });
  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe({
      next: (result) => {
        alert('Profile updated!');
        localStorage.setItem('username', result.username);
      },
      error: (err) => console.error(err),
    });
  }

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
