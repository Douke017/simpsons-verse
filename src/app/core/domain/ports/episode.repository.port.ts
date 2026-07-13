import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../interfaces/episode.interface';

export interface EpisodeRepository {
  getEpisodes(page?: number): Observable<Episode[]>;
  getEpisodeById(id: number): Observable<Episode>;
}

export const EPISODE_REPOSITORY = new InjectionToken<EpisodeRepository>('EPISODE_REPOSITORY');
