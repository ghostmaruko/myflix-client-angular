import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = 'https://myflix-api-0vxe.onrender.com/';

// class to fetch data from API
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  // User registration
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails);
  }

  // User login
  // questa API serve per ottenre il token JWT dopo che utente inserisce pwd e username
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails);
  }

  // Get all movies
  // questa API serve per ottenere la lista di tutti i film
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  // Get one movie by title
  public getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  // Get director details
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${directorName}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  // Get genre details
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/${genreName}`, {
      headers: { Authorization: 'Bearer ' + token },
    });
  }

  // Get user
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Get favorite movies for a user
  public getFavoriteMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${username}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Add movie to favorite movies
  public addFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.post(
      apiUrl + `users/${username}/movies/${movieId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  // Delete movie from favorite movies
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Edit user
  public editUser(updatedUserDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.put(apiUrl + `users/${username}`, updatedUserDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Delete user
  public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
