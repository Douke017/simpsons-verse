import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Observable } from 'rxjs';
import { CardComponent } from '../../shared/components/card/card.component';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { CharactersService } from './application/characters.service';
import { characterProviders } from './characters.providers';
import { CharacterCardViewModel } from './presentation/character-card.view-model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [AsyncPipe, CardComponent, IonContent, IonHeader, IonTitle, IonToolbar, SimpsonsImageUrlPipe],
  providers: characterProviders,
})
export class CharactersPage {
  public readonly characters$: Observable<CharacterCardViewModel[]>;

  constructor(private readonly charactersService: CharactersService) {
    this.characters$ = this.charactersService.getCharacterCards();
  }
}
