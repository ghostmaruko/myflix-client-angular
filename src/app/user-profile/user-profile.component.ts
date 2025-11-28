import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    birthday: '',
  };
  favoriteMovies: string[] = [];

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.loadUser();
    this.loadFavorites();
  }

  loadUser(): void {
    this.fetchApiData.getUser().subscribe({
      next: (resp) => {
        this.user = resp;
      },
      error: (err) => console.error(err),
    });
  }

  loadFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (resp) => (this.favoriteMovies = resp.favoriteMovies || []),
      error: (err) => console.error(err),
    });
  }

  updateUser(): void {
    this.fetchApiData.updateUser(this.user).subscribe({
      next: (resp) => {
        console.log('User updated', resp);
        alert('Profile updated successfully!');
      },
      error: (err) => console.error(err),
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe({
        next: () => {
          alert('Account deleted!');
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          window.location.reload();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
