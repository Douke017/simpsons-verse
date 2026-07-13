import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SIMPSONS_EPISODES_ENDPOINT } from '../constants/simpsons-api.constants';
import { Episode } from '../../domain/interfaces/episode.interface';
import { EpisodeRepository } from '../../domain/ports/episode.repository.port';
import { SimpsonsApiEpisodeResponse } from './episode.dto';
import { mapSimpsonsApiEpisodeToDomain } from './episode.mapper';

@Injectable()
export class SimpsonsApiEpisodeRepository implements EpisodeRepository {
  private readonly endpoint = SIMPSONS_EPISODES_ENDPOINT;

  constructor(private readonly http: HttpClient) {}

  getEpisodes(page: number = 1): Observable<Episode[]> {
    return this.http.get<SimpsonsApiEpisodeResponse>(`${this.endpoint}?page=${page}`).pipe(
      map((response) => response.results.map(mapSimpsonsApiEpisodeToDomain)),
    );
  }

  getEpisodeById(id: number): Observable<Episode> {
    return this.http.get<any>(`${this.endpoint}/${id}`).pipe(
      map(mapSimpsonsApiEpisodeToDomain)
    );
  }
}
