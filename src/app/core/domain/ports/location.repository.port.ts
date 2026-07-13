import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../interfaces/location.interface';

export interface LocationRepository {
  getLocations(): Observable<Location[]>;
}

export const LOCATION_REPOSITORY = new InjectionToken<LocationRepository>('LOCATION_REPOSITORY');
