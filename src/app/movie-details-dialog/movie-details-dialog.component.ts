import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/**
 * MovieDetailsDialogComponent — dialog per mostrare i dettagli di un film.
 * Include pulsante per aggiungere/rimuovere dai preferiti.
 *
 * @component
 */
@Component({
  selector: 'app-movie-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss'],
})
export class MovieDetailsDialogComponent {
  /**
   * @param data — dati del film, include callback per favorite e stato
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  /** Aggiunge o rimuove il film dai preferiti usando la callback passata. */
  toggleFavorite(): void {
    this.data.onFavorite(this.data._id);
  }

  /** Controlla se il film è tra i preferiti usando la callback passata. */
  isFavorite(): boolean {
    return this.data.isFavorite(this.data._id);
  }
}
