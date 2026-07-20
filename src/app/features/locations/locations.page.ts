import { Component, OnInit, inject, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon
} from '@ionic/angular/standalone';
import { CardComponent } from '../../shared/components/card/card.component';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { LocationService } from '../../core/application/services/location.service';
import { FavoritesService } from '../../core/application/services/favorites.service';
import { LocationsPresenter } from './locations.presenter';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  standalone: true,
  imports: [
    CardComponent,
    SearchBarComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
    PaginationComponent,
    HeaderComponent,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonIcon,
    SimpsonsImageUrlPipe
  ],
})
export class LocationsPage implements OnInit {
  private readonly router = inject(Router);
  private readonly presenter = inject(LocationsPresenter);
  public readonly locationService = inject(LocationService);
  public readonly favoritesService = inject(FavoritesService);

  public readonly locations = computed(() => 
    this.presenter.toCardViewModels(this.locationService.filteredLocations())
  );

  constructor() {
    addIcons({ heart, heartOutline });
  }

  ngOnInit() {
    this.locationService.loadInitialPage();
  }

  public viewLocationDetails(id: number) {
    this.router.navigate(['/main/locations', id]);
  }
}
