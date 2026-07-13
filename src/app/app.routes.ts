import { Routes } from '@angular/router';
import { characterProviders } from './features/characters/characters.providers';
import { episodeProviders } from './features/episodes/episodes.providers';
import { locationProviders } from './features/locations/locations.providers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/home',
    pathMatch: 'full',
  },

  {
    path: 'main',
    loadComponent: () => import('./features/main/main.page').then(m => m.MainPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'characters',
        providers: characterProviders,
        loadComponent: () => import('./features/characters/characters.page').then(m => m.CharactersPage),
      },
      {
        path: 'episodes',
        providers: episodeProviders,
        loadComponent: () => import('./features/episodes/episodes.page').then(m => m.EpisodesPage),
      },
      {
        path: 'locations',
        providers: locationProviders,
        loadComponent: () => import('./features/locations/locations.page').then(m => m.LocationsPage),
      },
    ],
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'header',
    loadComponent: () => import('./shared/components/header/header.component').then(m => m.HeaderComponent)
  },
  {
    path: 'card',
    loadComponent: () => import('./shared/components/card/card.component').then(m => m.CardComponent)
  },
];
