import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const apiUrl = 'https://myflix-api-0vxe.onrender.com/';

/**
 * Service che gestisce tutte le chiamate HTTP verso l'API myFlix.
 * Fornisce metodi per autenticazione utenti, gestione film, generi, registi
 * e gestione dei film preferiti dell'utente.
 *
 * @remarks
 * Questo service è progettato per essere iniettato a livello root dell'applicazione
 * e semplifica l'interazione con l'API RESTful.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  constructor(private http: HttpClient) {}

  /**
   * Restituisce gli headers per le chiamate protette con JWT.
   * @returns HttpHeaders Oggetto contenente Authorization Bearer token.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Ritorna lo username dell'utente attualmente loggato.
   * @returns string | null Username o null se non loggato.
   */
  private getUsername(): string | null {
    return localStorage.getItem('username');
  }

  /**
   * Registra un nuovo utente.
   * @param userDetails Oggetto contenente username, password, email e birthday.
   * @returns Observable<any> Risposta dell'API con i dati dell'utente creato.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Effettua il login di un utente.
   * @param userDetails Oggetto contenente username e password.
   * @returns Observable<any> Risposta dell'API con token JWT.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Restituisce la lista di tutti i film.
   * @returns Observable<any[]> Array di oggetti Movie.
   */
  public getAllMovies(): Observable<any> {
    return this.http
      .get(apiUrl + 'movies', { headers: this.getAuthHeaders() })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Restituisce i dettagli di un singolo film.
   * @param title Titolo del film da recuperare.
   * @returns Observable<any> Oggetto Movie.
   */
  public getMovie(title: string): Observable<any> {
    return this.http
      .get(apiUrl + `movies/${title}`, { headers: this.getAuthHeaders() })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Restituisce informazioni su un regista.
   * @param directorName Nome del regista.
   * @returns Observable<any> Oggetto Director.
   */
  public getDirector(directorName: string): Observable<any> {
    return this.http
      .get(apiUrl + `directors/${directorName}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Restituisce informazioni su un genere.
   * @param genreName Nome del genere.
   * @returns Observable<any> Oggetto Genre.
   */
  public getGenre(genreName: string): Observable<any> {
    return this.http
      .get(apiUrl + `genres/${genreName}`, { headers: this.getAuthHeaders() })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Recupera i dati dell'utente loggato, inclusi i film preferiti.
   * @returns Observable<any> Oggetto User.
   */
  public getUser(): Observable<any> {
    return this.http
      .get(apiUrl + `users/${this.getUsername()}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Aggiorna i dati dell'utente loggato.
   * @param updatedUserDetails Oggetto contenente i campi da aggiornare.
   * @returns Observable<any> Utente aggiornato.
   */
  public updateUser(updatedUserDetails: any): Observable<any> {
    return this.http
      .put(apiUrl + `users/${this.getUsername()}`, updatedUserDetails, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Elimina l'utente loggato.
   * @returns Observable<any> Risposta dell'API.
   */
  public deleteUser(): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${this.getUsername()}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Aggiunge un film ai preferiti dell'utente loggato.
   * @param movieId ID del film da aggiungere.
   * @returns Observable<any> Utente aggiornato.
   */
  public addFavoriteMovie(movieId: string): Observable<any> {
    return this.http
      .post(
        apiUrl + `users/${this.getUsername()}/movies/${movieId}`,
        {},
        { headers: this.getAuthHeaders() }
      )
      .pipe(catchError((err) => throwError(() => err)));
  }

  /**
   * Rimuove un film dai preferiti dell'utente loggato.
   * @param movieId ID del film da rimuovere.
   * @returns Observable<any> Utente aggiornato.
   */
  public deleteFavoriteMovie(movieId: string): Observable<any> {
    return this.http
      .delete(apiUrl + `users/${this.getUsername()}/movies/${movieId}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError((err) => throwError(() => err)));
  }
}
