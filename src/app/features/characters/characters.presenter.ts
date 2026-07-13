import { Injectable } from '@angular/core';
import { calculateAge } from '../../shared/utils/age.util';
import { Character } from '../../core/domain/interfaces/character.interface';
import { CharacterCardViewModel } from './character-card.view-model';

@Injectable()
export class CharactersPresenter {
  toCardViewModels(characters: Character[]): CharacterCardViewModel[] {
    return characters.map((character) => {
      return {
        id: character.id,
        title: character.name,
        subtitle: character.occupation || character.status,
        content: character.phrases[0] || `${character.gender} · ${character.status}`,
        age: calculateAge(character.birthdate),
        birthdate: character.birthdate,
        gender: character.gender,
        occupation: character.occupation,
        status: character.status,
        portraitPath: character.portraitPath,
        alt: character.name,
      };
    });
  }
}
