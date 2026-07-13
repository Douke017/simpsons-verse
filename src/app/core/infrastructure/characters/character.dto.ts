export interface SimpsonsApiAppearanceDto {
  id: number;
  airdate: string;
  name: string;
}

export interface SimpsonsApiCharacterDto {
  id: number;
  age: number | null;
  birthdate: string | null;
  description?: string;
  first_appearance_ep_id?: number | null;
  first_appearance_sh_id?: number | null;
  first_appearance_ep?: SimpsonsApiAppearanceDto | null;
  first_appearance_sh?: SimpsonsApiAppearanceDto | null;
  gender: string;
  name: string;
  occupation: string;
  portrait_path: string;
  phrases: string[];
  status: string;
}

export interface SimpsonsApiResponse {
  results: SimpsonsApiCharacterDto[];
}
