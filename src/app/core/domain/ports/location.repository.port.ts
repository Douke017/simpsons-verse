import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';

export interface LocationRepository {
  getLocations(page?: number): Observable<Location[]>;
  getLocationById(id: number): Observable<Location>;
}

export const LOCATION_REPOSITORY = new InjectionToken<LocationRepository>('LOCATION_REPOSITORY');
