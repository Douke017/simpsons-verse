import { Injectable } from '@angular/core';
import { calculateAge } from '../../../shared/utils/age.util';
import { Character } from '../../../core/domain/models/character.model';
import { CharacterCardViewModel } from './character-card.view-model';

function pickFirstAppearance(character: Character): { title: string; date: string } | null {
  const appearances = [character.firstAppearanceShort, character.firstAppearanceEpisode].filter(
    (appearance): appearance is NonNullable<typeof appearance> => Boolean(appearance),
  );

  if (appearances.length === 0) {
    return null;
  }

  const earliestAppearance = appearances.reduce((current, candidate) => (
    new Date(candidate.airdate) < new Date(current.airdate) ? candidate : current
  ));

  return {
    title: earliestAppearance.name,
    date: earliestAppearance.airdate,
  };
}

@Injectable()
export class CharactersPresenter {
  toCardViewModels(characters: Character[]): CharacterCardViewModel[] {
    return characters.map((character) => {
      const firstAppearance = pickFirstAppearance(character);

      return {
        id: character.id,
        title: character.name,
        subtitle: character.occupation || character.status,
        content: character.phrases[0] || `${character.gender} · ${character.status}`,
        age: calculateAge(character.birthdate),
        firstAppearanceTitle: firstAppearance?.title ?? null,
        firstAppearanceDate: firstAppearance?.date ?? null,
        portraitPath: character.portraitPath,
        alt: character.name,
      };
    });
  }
}
