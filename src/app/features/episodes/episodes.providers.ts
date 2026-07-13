import { Provider } from '@angular/core';
import { GetEpisodesUseCase } from '../../core/application/use-cases/get-episodes.usecase';
import { EPISODE_REPOSITORY } from '../../core/domain/ports/episode.repository.port';
import { SimpsonsApiEpisodeRepository } from '../../core/infrastructure/episodes/simpsons-api-episode.repository';
import { EpisodesPresenter } from './episodes.presenter';

export const episodeProviders: Provider[] = [
  GetEpisodesUseCase,
  EpisodesPresenter,
  { provide: EPISODE_REPOSITORY, useClass: SimpsonsApiEpisodeRepository },
];
