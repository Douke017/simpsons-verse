import { Provider } from '@angular/core';
import { GetCharactersUseCase } from '../../core/application/use-cases/get-characters.usecase';
import { GetEpisodesUseCase } from '../../core/application/use-cases/get-episodes.usecase';
import { CHARACTER_REPOSITORY } from '../../core/domain/ports/character.repository.port';
import { EPISODE_REPOSITORY } from '../../core/domain/ports/episode.repository.port';
import { SimpsonsApiCharacterRepository } from '../../core/infrastructure/characters/simpsons-api-character.repository';
import { SimpsonsApiEpisodeRepository } from '../../core/infrastructure/episodes/simpsons-api-episode.repository';

export const homeProviders: Provider[] = [
  GetCharactersUseCase,
  GetEpisodesUseCase,
  { provide: CHARACTER_REPOSITORY, useClass: SimpsonsApiCharacterRepository },
  { provide: EPISODE_REPOSITORY, useClass: SimpsonsApiEpisodeRepository },
];
