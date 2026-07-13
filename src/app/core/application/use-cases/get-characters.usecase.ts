import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../domain/interfaces/character.interface';
import { CHARACTER_REPOSITORY, CharacterRepository } from '../../domain/ports/character.repository.port';

@Injectable()
export class GetCharactersUseCase {
  constructor(@Inject(CHARACTER_REPOSITORY) private readonly repository: CharacterRepository) {}

  execute(): Observable<Character[]> {
    return this.repository.getCharacters();
  }
}
