import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../domain/interfaces/location.interface';
import { LOCATION_REPOSITORY, LocationRepository } from '../../domain/ports/location.repository.port';

@Injectable()
export class GetLocationByIdUseCase {
  constructor(@Inject(LOCATION_REPOSITORY) private readonly repository: LocationRepository) {}

  execute(id: number): Observable<Location> {
    return this.repository.getLocationById(id);
  }
}
