import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SIMPSONS_LOCATIONS_ENDPOINT } from '../constants/simpsons-api.constants';
import { Location } from '../../domain/interfaces/location.interface';
import { LocationRepository } from '../../domain/ports/location.repository.port';
import { SimpsonsApiLocationResponse } from './location.dto';
import { mapSimpsonsApiLocationToDomain } from './location.mapper';

@Injectable()
export class SimpsonsApiLocationRepository implements LocationRepository {
  private readonly endpoint = SIMPSONS_LOCATIONS_ENDPOINT;

  constructor(private readonly http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<SimpsonsApiLocationResponse>(this.endpoint).pipe(
      map((response) => response.results.map(mapSimpsonsApiLocationToDomain)),
    );
  }
}
