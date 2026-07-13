import { Provider } from '@angular/core';
import { GetEpisodesUseCase } from '../../core/application/use-cases/get-episodes.usecase';
import { GetEpisodeByIdUseCase } from '../../core/application/use-cases/get-episode-by-id.usecase';
import { EPISODE_REPOSITORY } from '../../core/domain/ports/episode.repository.port';
import { SimpsonsApiEpisodeRepository } from '../../core/infrastructure/episodes/simpsons-api-episode.repository';
import { EpisodesPresenter } from './episodes.presenter';

// Import Character providers for featured characters rendering
import { GetCharactersUseCase } from '../../core/application/use-cases/get-characters.usecase';
import { CHARACTER_REPOSITORY } from '../../core/domain/ports/character.repository.port';
import { SimpsonsApiCharacterRepository } from '../../core/infrastructure/characters/simpsons-api-character.repository';
import { CharactersPresenter } from '../characters/characters.presenter';

export const episodeProviders: Provider[] = [
  GetEpisodesUseCase,
  GetEpisodeByIdUseCase,
  EpisodesPresenter,
  { provide: EPISODE_REPOSITORY, useClass: SimpsonsApiEpisodeRepository },
  GetCharactersUseCase,
  { provide: CHARACTER_REPOSITORY, useClass: SimpsonsApiCharacterRepository },
  CharactersPresenter,
];
