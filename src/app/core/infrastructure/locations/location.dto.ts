export interface SimpsonsApiLocationDto {
  id: number;
  name: string;
  image_path: string;
  town: string;
  use: string;
}

export interface SimpsonsApiLocationResponse {
  results: SimpsonsApiLocationDto[];
}
