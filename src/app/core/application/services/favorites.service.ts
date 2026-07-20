import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  public readonly favoriteCharacters = signal<number[]>([]);
  public readonly favoriteEpisodes = signal<number[]>([]);
  public readonly favoriteLocations = signal<number[]>([]);

  constructor() {
    // Load initial values from localStorage
    try {
      const chars = localStorage.getItem('favorite_characters');
      if (chars) this.favoriteCharacters.set(JSON.parse(chars));
    } catch {}

    try {
      const eps = localStorage.getItem('favorite_episodes');
      if (eps) this.favoriteEpisodes.set(JSON.parse(eps));
    } catch {}

    try {
      const locs = localStorage.getItem('favorite_locations');
      if (locs) this.favoriteLocations.set(JSON.parse(locs));
    } catch {}

    // Persist changes automatically using signals effects
    effect(() => {
      localStorage.setItem('favorite_characters', JSON.stringify(this.favoriteCharacters()));
    });

    effect(() => {
      localStorage.setItem('favorite_episodes', JSON.stringify(this.favoriteEpisodes()));
    });

    effect(() => {
      localStorage.setItem('favorite_locations', JSON.stringify(this.favoriteLocations()));
    });
  }

  public toggleCharacterFavorite(id: number): void {
    this.favoriteCharacters.update((curr) => 
      curr.includes(id) ? curr.filter(x => x !== id) : [...curr, id]
    );
  }

  public toggleEpisodeFavorite(id: number): void {
    this.favoriteEpisodes.update((curr) => 
      curr.includes(id) ? curr.filter(x => x !== id) : [...curr, id]
    );
  }

  public toggleLocationFavorite(id: number): void {
    this.favoriteLocations.update((curr) => 
      curr.includes(id) ? curr.filter(x => x !== id) : [...curr, id]
    );
  }

  public isCharacterFavorite(id: number): boolean {
    return this.favoriteCharacters().includes(id);
  }

  public isEpisodeFavorite(id: number): boolean {
    return this.favoriteEpisodes().includes(id);
  }

  public isLocationFavorite(id: number): boolean {
    return this.favoriteLocations().includes(id);
  }
}
