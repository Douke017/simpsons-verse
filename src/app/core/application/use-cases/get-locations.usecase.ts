import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../domain/interfaces/location.interface';
import { LOCATION_REPOSITORY, LocationRepository } from '../../domain/ports/location.repository.port';

@Injectable()
export class GetLocationsUseCase {
  constructor(@Inject(LOCATION_REPOSITORY) private readonly repository: LocationRepository) {}

  execute(): Observable<Location[]> {
    return this.repository.getLocations();
  }
}
