export interface SimpsonsApiEpisodeDto {
  id: number;
  airdate: string;
  episode_number: number;
  image_path: string;
  name: string;
  season: number;
  synopsis: string;
}

export interface SimpsonsApiEpisodeResponse {
  results: SimpsonsApiEpisodeDto[];
}
