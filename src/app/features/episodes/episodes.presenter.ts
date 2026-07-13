import { Injectable } from '@angular/core';
import { Episode } from '../../core/domain/interfaces/episode.interface';
import { EpisodeCardViewModel } from './episode-card.view-model';

@Injectable()
export class EpisodesPresenter {
  toCardViewModels(episodes: Episode[]): EpisodeCardViewModel[] {
    return episodes.map((episode) => {
      return {
        id: episode.id,
        title: episode.name,
        subtitle: `Season ${episode.season} · Episode ${episode.episodeNumber}`,
        content: episode.synopsis || 'No synopsis available.',
        season: episode.season,
        episodeNumber: episode.episodeNumber,
        airdate: episode.airdate,
        imagePath: episode.imagePath,
        alt: episode.name,
      };
    });
  }
}
