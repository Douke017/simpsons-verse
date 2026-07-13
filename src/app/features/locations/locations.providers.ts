import { Provider } from '@angular/core';
import { GetLocationsUseCase } from '../../core/application/use-cases/get-locations.usecase';
import { GetLocationByIdUseCase } from '../../core/application/use-cases/get-location-by-id.usecase';
import { LOCATION_REPOSITORY } from '../../core/domain/ports/location.repository.port';
import { SimpsonsApiLocationRepository } from '../../core/infrastructure/locations/simpsons-api-location.repository';
import { LocationsPresenter } from './locations.presenter';

export const locationProviders: Provider[] = [
  GetLocationsUseCase,
  GetLocationByIdUseCase,
  LocationsPresenter,
  { provide: LOCATION_REPOSITORY, useClass: SimpsonsApiLocationRepository },
];
