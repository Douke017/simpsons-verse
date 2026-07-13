import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SIMPSONS_CHARACTERS_ENDPOINT } from '../../infrastructure/constants/simpsons-api.constants';
import { Character } from '../../domain/interfaces/character.interface';
import { CharacterRepository } from '../../domain/ports/character.repository.port';
import { SimpsonsApiResponse } from './character.dto';
import { mapSimpsonsApiCharacterToDomain } from './character.mapper';

@Injectable()
export class SimpsonsApiCharacterRepository implements CharacterRepository {
  private readonly endpoint = SIMPSONS_CHARACTERS_ENDPOINT;

  constructor(private readonly http: HttpClient) {}

  getCharacters(): Observable<Character[]> {
    return this.http.get<SimpsonsApiResponse>(this.endpoint).pipe(
      map((response) => response.results.map(mapSimpsonsApiCharacterToDomain)),
    );
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<any>(`${this.endpoint}/${id}`).pipe(
      map(mapSimpsonsApiCharacterToDomain)
    );
  }
}
