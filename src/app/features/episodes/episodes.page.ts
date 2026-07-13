import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSpinner } from '@ionic/angular/standalone';
import { map } from 'rxjs/operators';
import { CardComponent } from '../../shared/components/card/card.component';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { GetEpisodesUseCase } from '../../core/application/use-cases/get-episodes.usecase';
import { EpisodesPresenter } from './episodes.presenter';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
  standalone: true,
  imports: [CardComponent, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSpinner, SimpsonsImageUrlPipe],
})
export class EpisodesPage {
  private readonly getEpisodesUseCase = inject(GetEpisodesUseCase);
  private readonly presenter = inject(EpisodesPresenter);

  public readonly episodes = toSignal(
    this.getEpisodesUseCase.execute().pipe(
      map((episodes) => this.presenter.toCardViewModels(episodes))
    ),
    { initialValue: [] }
  );
}
