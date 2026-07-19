import { Component, OnInit, inject, computed } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonContent,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { EpisodeService } from '../../core/application/services/episode.service';
import { EpisodesPresenter } from './episodes.presenter';
import { EpisodeCardViewModel } from './episode-card.view-model';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../shared/components/error-state/error-state.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonSpinner,
    IonGrid,
    IonRow,
    IonCol,
    SimpsonsImageUrlPipe,
    LoadingSpinnerComponent,
    ErrorStateComponent,
    PaginationComponent,
    HeaderComponent
  ],
})
export class EpisodesPage implements OnInit {
  private readonly router = inject(Router);
  private readonly presenter = inject(EpisodesPresenter);
  public readonly episodeService = inject(EpisodeService);

  // Mapped list of episodes view models
  public readonly episodes = computed(() => 
    this.presenter.toCardViewModels(this.episodeService.episodesList())
  );

  // Mapped selected focus episode view model
  public readonly selectedEpisode = computed(() => {
    const domainEp = this.episodeService.selectedEpisode();
    return domainEp ? this.presenter.toCardViewModels([domainEp])[0] : null;
  });

  ngOnInit() {
    this.episodeService.loadInitialPage();
  }

  public viewEpisodeDetails(id: number) {
    this.router.navigate(['/main/episodes', id]);
  }

  public selectEpisode(episodeVm: EpisodeCardViewModel): void {
    const domainEp = this.episodeService.episodesList().find(e => e.id === episodeVm.id);
    if (domainEp) {
      this.episodeService.selectEpisode(domainEp);
    }
  }
}
