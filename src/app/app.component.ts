import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

/**
 * AppComponent — componente root dell’app Angular.
 *
 * Contiene navbar e router-outlet.
 *
 * @component
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
