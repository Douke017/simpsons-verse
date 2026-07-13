import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonSpinner,
  IonButton
} from '@ionic/angular/standalone';
import { map } from 'rxjs/operators';
import { SimpsonsImageUrlPipe } from '../../../shared/pipes/image-url.pipe';
import { GetEpisodeByIdUseCase } from '../../../core/application/use-cases/get-episode-by-id.usecase';
import { Episode } from '../../../core/domain/interfaces/episode.interface';
import { GetCharactersUseCase } from '../../../core/application/use-cases/get-characters.usecase';
import { CharactersPresenter } from '../../characters/characters.presenter';
import { CharacterCardViewModel } from '../../characters/character-card.view-model';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.page.html',
  styleUrls: ['./episode-detail.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonSpinner,
    IonButton,
    DecimalPipe,
    SimpsonsImageUrlPipe
  ],
})
export class EpisodeDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly getEpisodeByIdUseCase = inject(GetEpisodeByIdUseCase);
  
  private readonly getCharactersUseCase = inject(GetCharactersUseCase);
  private readonly charactersPresenter = inject(CharactersPresenter);

  // States
  public readonly episode = signal<Episode | null>(null);
  public readonly isLoading = signal<boolean>(true);
  public readonly error = signal<string | null>(null);
  public readonly charactersList = signal<CharacterCardViewModel[]>([]);

  // Computed featured characters
  public readonly featuredCharacters = computed(() => {
    const ep = this.episode();
    const chars = this.charactersList();
    if (!ep || chars.length === 0) return [];

    const id = ep.id;
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
    // 1. Fetch characters
    this.getCharactersUseCase.execute().pipe(
      map((chars) => this.charactersPresenter.toCardViewModels(chars))
    ).subscribe((charsList) => {
      this.charactersList.set(charsList);
    });

    // 2. Fetch episode detail
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.getEpisodeByIdUseCase.execute(id).subscribe({
        next: (ep) => {
          this.episode.set(ep);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar la información del episodio.');
          this.isLoading.set(false);
        }
      });
    } else {
      this.error.set('ID de episodio no válido.');
      this.isLoading.set(false);
    }
  }

  public getRating(id: number): string {
    return ((86 + (id * 7) % 14) / 10).toFixed(1);
  }

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
