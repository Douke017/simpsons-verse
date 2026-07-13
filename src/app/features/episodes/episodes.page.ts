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
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { GetEpisodesUseCase } from '../../core/application/use-cases/get-episodes.usecase';
import { EpisodesPresenter } from './episodes.presenter';
import { EpisodeCardViewModel } from './episode-card.view-model';
import { GetCharactersUseCase } from '../../core/application/use-cases/get-characters.usecase';
import { CharactersPresenter } from '../characters/characters.presenter';
import { CharacterCardViewModel } from '../characters/character-card.view-model';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.page.html',
  styleUrls: ['./episodes.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
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
export class EpisodesPage implements OnInit {
  private readonly getEpisodesUseCase = inject(GetEpisodesUseCase);
  private readonly episodesPresenter = inject(EpisodesPresenter);
  private readonly router = inject(Router);

  public viewEpisodeDetails(id: number) {
    this.router.navigate(['/main/episodes', id]);
  }
  
  private readonly getCharactersUseCase = inject(GetCharactersUseCase);
  private readonly charactersPresenter = inject(CharactersPresenter);

  // Pagination state
  private currentPage = 1;
  private hasMorePages = true;

  // Selected featured episode (detailed in Hero banner)
  public readonly selectedEpisode = signal<EpisodeCardViewModel | null>(null);

  // Loaded list of episodes (available for infinite scroll explorer grid)
  public readonly episodesList = signal<EpisodeCardViewModel[]>([]);

  // Loaded list of characters (used for dynamic featured characters avatar selection)
  public readonly charactersList = signal<CharacterCardViewModel[]>([]);

  // Computed featured characters list for the selected episode
  public readonly featuredCharacters = computed(() => {
    const selected = this.selectedEpisode();
    const chars = this.charactersList();
    if (!selected || chars.length === 0) return [];

    const id = selected.id;
    // Deterministic roles options to match Lyle Lanley monorail vibe
    const rolesOptions = [
      ['Antagonista', 'Conductor', 'Voz de la Razón'],
      ['Héroe', 'Cómplice', 'Testigo'],
      ['Director', 'Estudiante', 'Supervisor'],
      ['Vendedor', 'Ayudante', 'Ciudadano']
    ];
    const roles = rolesOptions[id % rolesOptions.length];

    const picked = [
      chars[id % chars.length],
      chars[(id + 3) % chars.length],
      chars[(id + 7) % chars.length],
    ];

    return picked.map((c, index) => ({
      name: c.title,
      image: c.portraitPath,
      role: roles[index]
    }));
  });

  ngOnInit() {
    // 1. Fetch characters list for mapping
    this.getCharactersUseCase.execute().pipe(
      map((chars) => this.charactersPresenter.toCardViewModels(chars))
    ).subscribe((charsList) => {
      this.charactersList.set(charsList);
    });

    // 2. Fetch episodes list (page 1)
    this.loadNextPage();
  }

  // Load episodes page and append to the list
  public loadNextPage(event?: any): void {
    if (!this.hasMorePages) {
      if (event) event.target.complete();
      return;
    }

    this.getEpisodesUseCase.execute(this.currentPage).pipe(
      map((episodes) => this.episodesPresenter.toCardViewModels(episodes))
    ).subscribe({
      next: (episodes) => {
        if (episodes.length === 0) {
          this.hasMorePages = false;
        } else {
          // If first page, set the first episode as default selected focus
          if (this.currentPage === 1) {
            this.selectedEpisode.set(episodes[0]);
          }
          this.episodesList.update((current) => [...current, ...episodes]);
          this.currentPage++;
        }
        if (event) event.target.complete();
      },
      error: () => {
        if (event) event.target.complete();
      }
    });
  }

  // Select focus episode and scroll smoothly to the top of the container
  public selectEpisode(episode: EpisodeCardViewModel): void {
    this.selectedEpisode.set(episode);
    
    // Find ion-content and scroll to top
    const content = document.querySelector('ion-content');
    if (content && typeof (content as any).scrollToTop === 'function') {
      (content as any).scrollToTop(600); // 600ms smooth scroll
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Deterministic ratings
  public getRating(id: number): string {
    return ((86 + (id * 7) % 14) / 10).toFixed(1);
  }

  // Deterministic writers
  public getWriter(id: number): string {
    const writers = [
      "Conan O'Brien",
      "John Swartzwelder",
      "Al Jean",
      "Jon Vitti",
      "George Meyer",
      "Mike Reiss",
      "David M. Stern"
    ];
    return writers[id % writers.length];
  }
}
