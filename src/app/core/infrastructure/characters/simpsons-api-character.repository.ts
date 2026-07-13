import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Character } from '../../domain/models/character.model';
import { CharacterRepository } from '../../domain/ports/character.repository.port';
import { SimpsonsApiResponse } from './character.dto';
import { mapSimpsonsApiCharacterToDomain } from './character.mapper';

@Injectable()
export class SimpsonsApiCharacterRepository implements CharacterRepository {
  private readonly endpoint = 'https://thesimpsonsapi.com/api/characters';

  constructor(private readonly http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<SimpsonsApiResponse>(this.endpoint).pipe(
      map((response) => response.results.map(mapSimpsonsApiCharacterToDomain)),
    );
  }
}
