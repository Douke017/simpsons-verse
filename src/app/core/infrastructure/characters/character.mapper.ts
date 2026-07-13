import { Character } from '../../domain/models/character.model';
import { SimpsonsApiCharacterDto } from './character.dto';

export function mapSimpsonsApiCharacterToDomain(dto: SimpsonsApiCharacterDto): Character {
  return {
    id: dto.id,
    name: dto.name,
    age: dto.age,
    birthdate: dto.birthdate,
    gender: dto.gender,
    occupation: dto.occupation,
    portraitPath: dto.portrait_path,
    phrases: dto.phrases,
    status: dto.status,
    firstAppearanceEpisode: dto.first_appearance_ep
      ? {
          name: dto.first_appearance_ep.name,
          airdate: dto.first_appearance_ep.airdate,
        }
      : null,
    firstAppearanceShort: dto.first_appearance_sh
      ? {
          name: dto.first_appearance_sh.name,
          airdate: dto.first_appearance_sh.airdate,
        }
      : null,
  };
}
