import { Injectable, inject, signal, computed } from '@angular/core';
import { GetLocationsUseCase } from '../use-cases/get-locations.usecase';
import { Location } from '../../domain/interfaces/location.interface';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly getLocationsUseCase = inject(GetLocationsUseCase);

  // States (Domain models)
  public readonly locationsList = signal<Location[]>([]);
  public readonly isLoading = signal<boolean>(false);
  public readonly error = signal<string | null>(null);
  public readonly currentPage = signal<number>(1);
  public readonly hasMore = signal<boolean>(true);
  public readonly searchQuery = signal<string>('');
  public readonly selectedCategory = signal<string>('All');
  public readonly categories = [
    'All',
    'Food & Drink',
    'Industrial',
    'Shopping',
    'Residential',
    'Education',
    'Other'
  ];

  // Computed filtered list (Domain models)
  public readonly filteredLocations = computed<Location[]>(() => {
    const rawList = this.locationsList();
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return rawList.filter((location) => {
      const town = location.town || 'Springfield';
      const use = location.use || 'Unknown';

      // 1. Search filter
      const matchesSearch = !query || 
        location.name.toLowerCase().includes(query) || 
        town.toLowerCase().includes(query);

      // 2. Category filter
      let matchesCategory = true;
      if (category === 'All') {
        matchesCategory = true;
      } else if (category === 'Residential') {
        matchesCategory = town === 'Residential' || use === 'Residential';
      } else if (category === 'Industrial') {
        matchesCategory = use.includes('Energy') || use.includes('factory');
      } else if (category === 'Education') {
        matchesCategory = use === 'Education';
      } else if (category === 'Food & Drink') {
        matchesCategory = use.includes('Bar') || use.includes('food') || use.includes('Brewery') || use.includes('Tavern');
      } else if (category === 'Shopping') {
        matchesCategory = use.includes('Store') || use.includes('Mall') || use.includes('Shops') || use.includes('Kwik');
      } else { // 'Other'
        const known = ['Residential', 'Education'];
        const isKnownUse = known.includes(use) ||
          use.includes('Energy') || use.includes('factory') ||
          use.includes('Bar') || use.includes('food') || use.includes('Brewery') || use.includes('Tavern') ||
          use.includes('Store') || use.includes('Mall') || use.includes('Shops') || use.includes('Kwik');
        matchesCategory = !isKnownUse;
      }

      return matchesSearch && matchesCategory;
    });
  });

  public loadInitialPage(): void {
    if (this.locationsList().length > 0) {
      return;
    }
    this.goToPage(1);
  }

  public goToPage(page: number): void {
    if (page < 1 || this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.getLocationsUseCase.execute(page)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (locs) => {
          this.locationsList.set(locs);
          this.currentPage.set(page);
          this.hasMore.set(locs.length === 20);
        },
        error: () => {
          this.error.set('No se pudieron cargar las ubicaciones de Springfield.');
        }
      });
  }

  public setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }

  public setSelectedCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
