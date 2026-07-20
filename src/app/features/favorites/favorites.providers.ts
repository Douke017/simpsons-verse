import { Provider } from '@angular/core';
import { GetCharacterByIdUseCase } from '../../core/application/use-cases/get-character-by-id.usecase';
import { GetEpisodeByIdUseCase } from '../../core/application/use-cases/get-episode-by-id.usecase';
import { GetLocationByIdUseCase } from '../../core/application/use-cases/get-location-by-id.usecase';
import { CHARACTER_REPOSITORY } from '../../core/domain/ports/character.repository.port';
import { SimpsonsApiCharacterRepository } from '../../core/infrastructure/characters/simpsons-api-character.repository';
import { EPISODE_REPOSITORY } from '../../core/domain/ports/episode.repository.port';
import { SimpsonsApiEpisodeRepository } from '../../core/infrastructure/episodes/simpsons-api-episode.repository';
import { LOCATION_REPOSITORY } from '../../core/domain/ports/location.repository.port';
import { SimpsonsApiLocationRepository } from '../../core/infrastructure/locations/simpsons-api-location.repository';
import { CharactersPresenter } from '../characters/characters.presenter';
import { EpisodesPresenter } from '../episodes/episodes.presenter';
import { LocationsPresenter } from '../locations/locations.presenter';

export const favoritesProviders: Provider[] = [
  GetCharacterByIdUseCase,
  GetEpisodeByIdUseCase,
  GetLocationByIdUseCase,
  CharactersPresenter,
  EpisodesPresenter,
  LocationsPresenter,
  { provide: CHARACTER_REPOSITORY, useClass: SimpsonsApiCharacterRepository },
  { provide: EPISODE_REPOSITORY, useClass: SimpsonsApiEpisodeRepository },
  { provide: LOCATION_REPOSITORY, useClass: SimpsonsApiLocationRepository },
];
