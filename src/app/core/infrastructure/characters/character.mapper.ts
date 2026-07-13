import { Character } from '../../domain/interfaces/character.interface';
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
  };
}
