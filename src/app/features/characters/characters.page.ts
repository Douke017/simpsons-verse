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
import { CharacterService } from '../../core/application/services/character.service';
import { FavoritesService } from '../../core/application/services/favorites.service';
import { CharactersPresenter } from './characters.presenter';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [
    CardComponent,
    SearchBarComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent,
    PaginationComponent,
    HeaderComponent,
    SimpsonsImageUrlPipe,
    IonContent,
    IonGrid,
    IonRow,
    IonCol
  ],
})
export class CharactersPage implements OnInit {
  private readonly router = inject(Router);
  private readonly presenter = inject(CharactersPresenter);
  public readonly characterService = inject(CharacterService);
  public readonly favoritesService = inject(FavoritesService);

  public readonly characters = computed(() => 
    this.presenter.toCardViewModels(this.characterService.filteredCharacters())
  );

  ngOnInit(): void {
    this.characterService.loadInitialPage();
  }

  public viewCharacterDetails(id: number): void {
    this.router.navigate(['/main/characters', id]);
  }
}
