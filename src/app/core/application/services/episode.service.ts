import { Injectable, inject, signal, computed } from '@angular/core';
import { GetEpisodesUseCase } from '../use-cases/get-episodes.usecase';
import { GetCharactersUseCase } from '../use-cases/get-characters.usecase';
import { Episode } from '../../domain/interfaces/episode.interface';
import { Character } from '../../domain/interfaces/character.interface';
import { finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private readonly getEpisodesUseCase = inject(GetEpisodesUseCase);
  private readonly getCharactersUseCase = inject(GetCharactersUseCase);

  // States (Domain models)
  public readonly episodesList = signal<Episode[]>([]);
  public readonly selectedEpisode = signal<Episode | null>(null);
  public readonly isLoading = signal<boolean>(false);
  public readonly error = signal<string | null>(null);
  public readonly currentPage = signal<number>(1);
  public readonly hasMore = signal<boolean>(true);
  public readonly charactersList = signal<Character[]>([]);

  // Computed featured characters (Domain models mapping)
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
      name: c.name,
      image: c.portraitPath,
      role: roles[index]
    }));
  });

  public loadInitialPage(): void {
    // 1. Fetch characters list first for mapping
    if (this.charactersList().length === 0) {
      this.getCharactersUseCase.execute().subscribe((charsList) => {
        this.charactersList.set(charsList);
      });
    }

    // 2. Fetch episodes list page 1
    if (this.episodesList().length > 0) {
      return;
    }
    this.goToPage(1);
  }

  public goToPage(page: number): void {
    if (page < 1 || this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.getEpisodesUseCase.execute(page)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (eps) => {
          this.episodesList.set(eps);
          if (eps.length > 0) {
            this.selectedEpisode.set(eps[0]);
          }
          this.currentPage.set(page);
          this.hasMore.set(eps.length === 20);
        },
        error: () => {
          this.error.set('No se pudieron cargar los episodios de Springfield.');
        }
      });
  }

  public selectEpisode(episode: Episode): void {
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
