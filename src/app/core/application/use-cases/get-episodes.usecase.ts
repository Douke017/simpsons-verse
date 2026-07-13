import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../../domain/interfaces/episode.interface';
import { EPISODE_REPOSITORY, EpisodeRepository } from '../../domain/ports/episode.repository.port';

@Injectable()
export class GetEpisodesUseCase {
  constructor(@Inject(EPISODE_REPOSITORY) private readonly repository: EpisodeRepository) {}

  execute(): Observable<Episode[]> {
    return this.repository.getEpisodes();
  }
}
