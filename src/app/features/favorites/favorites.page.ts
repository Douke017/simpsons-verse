import { Component, effect, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { CardComponent } from '../../shared/components/card/card.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FavoritesService } from '../../core/application/services/favorites.service';
import { GetCharacterByIdUseCase } from '../../core/application/use-cases/get-character-by-id.usecase';
import { GetEpisodeByIdUseCase } from '../../core/application/use-cases/get-episode-by-id.usecase';
import { GetLocationByIdUseCase } from '../../core/application/use-cases/get-location-by-id.usecase';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';

export interface FavoriteItemViewModel {
  id: number;
  type: 'character' | 'episode' | 'location';
  title: string;
  subtitle: string;
  content: string;
  image: string;
  routeUrl: string;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    CardComponent,
    SearchBarComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
    HeaderComponent,
    SimpsonsImageUrlPipe
  ],
})
export class FavoritesPage {
  private readonly router = inject(Router);
  public readonly favoritesService = inject(FavoritesService);
  private readonly getCharacterByIdUseCase = inject(GetCharacterByIdUseCase);
  private readonly getEpisodeByIdUseCase = inject(GetEpisodeByIdUseCase);
  private readonly getLocationByIdUseCase = inject(GetLocationByIdUseCase);

  public readonly loading = signal<boolean>(false);
  public readonly error = signal<string | null>(null);
  public readonly favoritesItems = signal<FavoriteItemViewModel[]>([]);
  public readonly searchQuery = signal<string>('');

  public readonly filteredFavorites = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const list = this.favoritesItems();
    if (!query) return list;

    return list.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.content.toLowerCase().includes(query)
    );
  });

  constructor() {
    // Reactively reload items whenever the lists of favorited IDs change
    effect(() => {
      const charIds = this.favoritesService.favoriteCharacters();
      const epIds = this.favoritesService.favoriteEpisodes();
      const locIds = this.favoritesService.favoriteLocations();

      this.loadFavoriteDetails(charIds, epIds, locIds);
    }, { allowSignalWrites: true });
  }

  private loadFavoriteDetails(charIds: number[], epIds: number[], locIds: number[]): void {
    if (charIds.length === 0 && epIds.length === 0 && locIds.length === 0) {
      this.favoritesItems.set([]);
      this.loading.set(false);
      return;
    }

    this.loading.set(true);

    const charObs = charIds.map(id => this.getCharacterByIdUseCase.execute(id).pipe(
      map(char => ({
        id: char.id,
        type: 'character' as const,
        title: char.name,
        subtitle: char.occupation || (char.status === 'Alive' ? 'Vivo' : char.status === 'Deceased' ? 'Fallecido' : 'Desconocido'),
        content: char.phrases && char.phrases.length > 0 ? char.phrases[0] : 'Personaje de Los Simpson',
        image: char.portraitPath,
        routeUrl: `/main/characters/${char.id}`
      })),
      catchError(() => of(null))
    ));

    const epObs = epIds.map(id => this.getEpisodeByIdUseCase.execute(id).pipe(
      map(ep => ({
        id: ep.id,
        type: 'episode' as const,
        title: ep.name,
        subtitle: `Temp. ${ep.season} - Ep. ${ep.episodeNumber}`,
        content: ep.synopsis,
        image: ep.imagePath,
        routeUrl: `/main/episodes/${ep.id}`
      })),
      catchError(() => of(null))
    ));

    const locObs = locIds.map(id => this.getLocationByIdUseCase.execute(id).pipe(
      map(loc => ({
        id: loc.id,
        type: 'location' as const,
        title: loc.name,
        subtitle: loc.use || loc.town || 'Ubicación',
        content: loc.description || 'Ubicación en Springfield',
        image: loc.imagePath,
        routeUrl: `/main/locations/${loc.id}`
      })),
      catchError(() => of(null))
    ));

    const allRequests = [...charObs, ...epObs, ...locObs];

    forkJoin(allRequests).subscribe({
      next: (results) => {
        const validItems = results.filter((item): item is FavoriteItemViewModel => item !== null);
        this.favoritesItems.set(validItems);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Error al cargar la información de favoritos');
        this.loading.set(false);
      }
    });
  }

  public removeFavorite(item: FavoriteItemViewModel): void {
    if (item.type === 'character') {
      this.favoritesService.toggleCharacterFavorite(item.id);
    } else if (item.type === 'episode') {
      this.favoritesService.toggleEpisodeFavorite(item.id);
    } else if (item.type === 'location') {
      this.favoritesService.toggleLocationFavorite(item.id);
    }
  }

  public viewDetails(item: FavoriteItemViewModel): void {
    this.router.navigate([item.routeUrl]);
  }
}
