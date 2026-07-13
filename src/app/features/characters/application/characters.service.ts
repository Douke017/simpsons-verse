import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { GetCharactersUseCase } from '../../../core/application/use-cases/get-characters.usecase';
import { CharacterCardViewModel } from '../presentation/character-card.view-model';
import { CharactersPresenter } from '../presentation/characters.presenter';

@Injectable()
export class CharactersService {
  constructor(
    private readonly getCharactersUseCase: GetCharactersUseCase,
    private readonly charactersPresenter: CharactersPresenter,
  ) {}

  getCharacterCards(): Observable<CharacterCardViewModel[]> {
    return this.getCharactersUseCase.execute().pipe(
      map((characters) => this.charactersPresenter.toCardViewModels(characters)),
    );
  }
}
