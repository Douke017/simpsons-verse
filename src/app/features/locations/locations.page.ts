import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSpinner } from '@ionic/angular/standalone';
import { map } from 'rxjs/operators';
import { CardComponent } from '../../shared/components/card/card.component';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { GetLocationsUseCase } from '../../core/application/use-cases/get-locations.usecase';
import { LocationsPresenter } from './locations.presenter';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.page.html',
  styleUrls: ['./locations.page.scss'],
  standalone: true,
  imports: [CardComponent, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSpinner, SimpsonsImageUrlPipe],
})
export class LocationsPage {
  private readonly getLocationsUseCase = inject(GetLocationsUseCase);
  private readonly presenter = inject(LocationsPresenter);

  public readonly locations = toSignal(
    this.getLocationsUseCase.execute().pipe(
      map((locations) => this.presenter.toCardViewModels(locations))
    ),
    { initialValue: [] }
  );
}
