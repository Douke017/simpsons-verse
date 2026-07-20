import { Routes } from '@angular/router';
import { characterProviders } from './features/characters/characters.providers';
import { episodeProviders } from './features/episodes/episodes.providers';
import { locationProviders } from './features/locations/locations.providers';
import { homeProviders } from './features/home/home.providers';
import { favoritesProviders } from './features/favorites/favorites.providers';

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
        providers: homeProviders,
        loadComponent: () => import('./features/home/home.page').then(m => m.HomePage),
      },
      {
        path: 'characters',
        providers: characterProviders,
        children: [
          {
            path: '',
            loadComponent: () => import('./features/characters/characters.page').then(m => m.CharactersPage),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/characters/character-detail/character-detail.page').then(m => m.CharacterDetailPage),
          }
        ]
      },
      {
        path: 'episodes',
        providers: episodeProviders,
        children: [
          {
            path: '',
            loadComponent: () => import('./features/episodes/episodes.page').then(m => m.EpisodesPage),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/episodes/episode-detail/episode-detail.page').then(m => m.EpisodeDetailPage),
          }
        ]
      },
      {
        path: 'locations',
        providers: locationProviders,
        children: [
          {
            path: '',
            loadComponent: () => import('./features/locations/locations.page').then(m => m.LocationsPage),
          },
          {
            path: ':id',
            loadComponent: () => import('./features/locations/location-detail/location-detail.page').then(m => m.LocationDetailPage),
          }
        ]
      },
      {
        path: 'favorites',
        providers: favoritesProviders,
        loadComponent: () => import('./features/favorites/favorites.page').then(m => m.FavoritesPage),
      },
    ],
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
