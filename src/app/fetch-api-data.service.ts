import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'https://myflix-api-0vxe.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /** Helper: ritorna gli headers con token */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /** Helper: ritorna username */
  private getUsername(): string | null {
    return localStorage.getItem('username');
  }

  /** User registration */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** User login */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Get all movies */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.getAuthHeaders() })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Get one movie */
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, { headers: this.getAuthHeaders() })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Get director */
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `directors/${directorName}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Get genre */
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + `genres/${genreName}`, { headers: this.getAuthHeaders() })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Get user (includes favorite movies array) */
  public getUser(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${this.getUsername()}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Update user */
  public updateUser(updatedUserDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${this.getUsername()}`, updatedUserDetails, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Delete user */
  public deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${this.getUsername()}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Add favorite movie */
  public addFavoriteMovie(movieId: string): Observable<any> {
    return this.http
      .post(
        apiUrl + `users/${this.getUsername()}/movies/${movieId}`,
        {},
        { headers: this.getAuthHeaders() }
      )
      .pipe(catchError((err) => throwError(() => err)));
  }

  /** Delete favorite movie */
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${this.getUsername()}/movies/${movieId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }
}
