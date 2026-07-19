import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import {
  IonContent,
  IonIcon,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { menu, search, people, tv, map as mapIcon, arrowForward } from 'ionicons/icons';
import { GetCharactersUseCase } from '../../core/application/use-cases/get-characters.usecase';
import { GetEpisodesUseCase } from '../../core/application/use-cases/get-episodes.usecase';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonIcon,
    IonSpinner,
    SimpsonsImageUrlPipe,
    HeaderComponent
  ]
})
export class HomePage {
  private readonly getCharactersUseCase = inject(GetCharactersUseCase);
  private readonly getEpisodesUseCase = inject(GetEpisodesUseCase);
  private readonly router = inject(Router);

  public viewEpisodeDetails(id: number) {
    this.router.navigate(['/main/episodes', id]);
  }

  public viewCharacterDetails(id: number) {
    this.router.navigate(['/main/characters', id]);
  }

  // Load first 6 characters for the Hero carousel banner
  public readonly characters = toSignal(
    this.getCharactersUseCase.execute().pipe(
      map((list) => list.slice(0, 6))
    ),
    { initialValue: [] }
  );

  // Load first 4 episodes for the Recent Episodes scroll list
  public readonly episodes = toSignal(
    this.getEpisodesUseCase.execute().pipe(
      map((list) => list.slice(0, 4))
    ),
    { initialValue: [] }
  );

  constructor() {
    addIcons({ menu, search, people, tv, map: mapIcon, arrowForward });
  }
}
