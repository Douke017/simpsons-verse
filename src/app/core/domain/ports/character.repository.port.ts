import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../interfaces/character.interface';

export interface CharacterRepository {
  getCharacters(): Observable<Character[]>;
}

export const CHARACTER_REPOSITORY = new InjectionToken<CharacterRepository>('CHARACTER_REPOSITORY');
