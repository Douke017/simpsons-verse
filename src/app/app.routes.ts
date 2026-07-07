import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/home',
    pathMatch: 'full',
  },

  {
    path: 'main',
    loadComponent: () => import('./features/main/main.page').then(m => m.MainPage),
    childRoutes: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'characters',
        loadComponent: () => import('./features/characters/characters.page').then(m => m.CharactersPage),
      },
      {
        path: 'episodes',
        loadComponent: () => import('./features/episodes/episodes.page').then(m => m.EpisodesPage),
      },
      {
        path: 'locations',
        loadComponent: () => import('./features/locations/locations.page').then(m => m.LocationsPage),
      },
    ],
  },
  {
    path: 'main',
    loadComponent: () => import('./features/main/main.page').then( m => m.MainPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.page').then( m => m.ProfilePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.page').then( m => m.ProfilePage)
  },
];