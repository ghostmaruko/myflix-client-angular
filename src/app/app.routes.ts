import { Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { UserProfileViewComponent } from './user-profile-view/user-profile-view.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },

  { path: 'welcome', component: WelcomePageComponent },

  {
    path: 'movies',
    component: MovieCardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileViewComponent,
    canActivate: [AuthGuard],
  },

  { path: '**', redirectTo: 'welcome' },
];
