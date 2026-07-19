import { Provider } from '@angular/core';
import { GetCharactersUseCase } from '../../core/application/use-cases/get-characters.usecase';
import { GetCharacterByIdUseCase } from '../../core/application/use-cases/get-character-by-id.usecase';
import { CHARACTER_REPOSITORY } from '../../core/domain/ports/character.repository.port';
import { SimpsonsApiCharacterRepository } from '../../core/infrastructure/characters/simpsons-api-character.repository';
import { CharactersPresenter } from './characters.presenter';
import { CharacterService } from '../../core/application/services/character.service';

export const characterProviders: Provider[] = [
  GetCharactersUseCase,
  GetCharacterByIdUseCase,
  CharactersPresenter,
  CharacterService,
  { provide: CHARACTER_REPOSITORY, useClass: SimpsonsApiCharacterRepository },
];
