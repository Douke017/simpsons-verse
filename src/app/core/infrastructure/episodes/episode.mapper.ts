import { Episode } from '../../domain/interfaces/episode.interface';
import { SimpsonsApiEpisodeDto } from './episode.dto';

export function mapSimpsonsApiEpisodeToDomain(dto: SimpsonsApiEpisodeDto): Episode {
  return {
    id: dto.id,
    name: dto.name,
    airdate: dto.airdate,
    episodeNumber: dto.episode_number,
    season: dto.season,
    synopsis: dto.synopsis,
    imagePath: dto.image_path,
  };
}
