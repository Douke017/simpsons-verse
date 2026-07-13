import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonSpinner,
  IonButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import { map } from 'rxjs/operators';
import { CardComponent } from '../../shared/components/card/card.component';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { GetLocationsUseCase } from '../../core/application/use-cases/get-locations.usecase';
import { LocationsPresenter } from './locations.presenter';
import { LocationCardViewModel } from './location-card.view-model';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CardComponent,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonSpinner,
    IonButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    SimpsonsImageUrlPipe
  ],
})
export class LocationsPage implements OnInit {
  private readonly getLocationsUseCase = inject(GetLocationsUseCase);
  private readonly presenter = inject(LocationsPresenter);
  private readonly router = inject(Router);

  public viewLocationDetails(id: number) {
    this.router.navigate(['/main/locations', id]);
  }

  // Pagination state
  private currentPage = 1;
  private hasMorePages = true;

  // Search & Filter states
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

  // Writable Signal list holding loaded locations (needed for infinite appending)
  public readonly locationsList = signal<LocationCardViewModel[]>([]);

  // Computed Signal filtering the locationsList dynamically
  public readonly filteredLocations = computed<LocationCardViewModel[]>(() => {
    const rawList = this.locationsList();
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();

    return rawList.filter((location) => {
      // 1. Search filter
      const matchesSearch = !query || 
        location.title.toLowerCase().includes(query) || 
        location.town.toLowerCase().includes(query);

      // 2. Category filter
      let matchesCategory = true;
      if (category === 'All') {
        matchesCategory = true;
      } else if (category === 'Residential') {
        matchesCategory = location.town === 'Residential' || location.use === 'Residential';
      } else if (category === 'Industrial') {
        matchesCategory = location.use.includes('Energy') || location.use.includes('factory');
      } else if (category === 'Education') {
        matchesCategory = location.use === 'Education';
      } else if (category === 'Food & Drink') {
        matchesCategory = location.use.includes('Bar') || location.use.includes('food') || location.use.includes('Brewery') || location.use.includes('Tavern');
      } else if (category === 'Shopping') {
        matchesCategory = location.use.includes('Store') || location.use.includes('Mall') || location.use.includes('Shops') || location.use.includes('Kwik');
      } else { // 'Other'
        const known = ['Residential', 'Education'];
        const isKnownUse = known.includes(location.use) ||
          location.use.includes('Energy') || location.use.includes('factory') ||
          location.use.includes('Bar') || location.use.includes('food') || location.use.includes('Brewery') || location.use.includes('Tavern') ||
          location.use.includes('Store') || location.use.includes('Mall') || location.use.includes('Shops') || location.use.includes('Kwik');
        matchesCategory = !isKnownUse;
      }

      return matchesSearch && matchesCategory;
    });
  });

  ngOnInit() {
    this.loadNextPage();
  }

  // Load locations page and append to the list signal
  public loadNextPage(event?: any): void {
    if (!this.hasMorePages) {
      if (event) event.target.complete();
      return;
    }

    this.getLocationsUseCase.execute(this.currentPage).subscribe({
      next: (locations) => {
        if (locations.length === 0) {
          this.hasMorePages = false;
        } else {
          const viewModels = this.presenter.toCardViewModels(locations);
          this.locationsList.update((current) => [...current, ...viewModels]);
          this.currentPage++;
        }
        if (event) event.target.complete();
      },
      error: () => {
        if (event) event.target.complete();
      }
    });
  }

  // Search input handler
  public onSearchChange(event: any): void {
    this.searchQuery.set(event?.target?.value || '');
  }

  // Category chip selection
  public selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
