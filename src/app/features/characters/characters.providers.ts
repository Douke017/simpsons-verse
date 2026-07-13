import { Provider } from '@angular/core';
import { GetCharactersUseCase } from '../../core/application/use-cases/get-characters.usecase';
import { CHARACTER_REPOSITORY } from '../../core/domain/ports/character.repository.port';
import { SimpsonsApiCharacterRepository } from '../../core/infrastructure/characters/simpsons-api-character.repository';
import { CharactersService } from './application/characters.service';
import { CharactersPresenter } from './presentation/characters.presenter';

export const characterProviders: Provider[] = [
  GetCharactersUseCase,
  CharactersPresenter,
  CharactersService,
  { provide: CHARACTER_REPOSITORY, useClass: SimpsonsApiCharacterRepository },
];
