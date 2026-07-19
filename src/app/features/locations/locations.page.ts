import { Component, OnInit, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
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
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { LocationService } from '../../core/application/services/location.service';
import { LocationsPresenter } from './locations.presenter';

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
    SimpsonsImageUrlPipe
  ],
})
export class LocationsPage implements OnInit {
  private readonly router = inject(Router);
  private readonly presenter = inject(LocationsPresenter);
  public readonly locationService = inject(LocationService);

  public readonly locations = computed(() => 
    this.presenter.toCardViewModels(this.locationService.filteredLocations())
  );

  ngOnInit() {
    this.locationService.loadInitialPage();
  }

  public viewLocationDetails(id: number) {
    this.router.navigate(['/main/locations', id]);
  }
}
