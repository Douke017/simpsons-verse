import { Injectable } from '@angular/core';
import { Location } from '../../core/domain/interfaces/location.interface';
import { LocationCardViewModel } from './location-card.view-model';

@Injectable()
export class LocationsPresenter {
  toCardViewModels(locations: Location[]): LocationCardViewModel[] {
    return locations.map((location) => {
      return {
        id: location.id,
        title: location.name,
        subtitle: location.town || 'Springfield',
        content: `Purpose: ${location.use || 'Unknown'}`,
        town: location.town || 'Springfield',
        use: location.use || 'Unknown',
        imagePath: location.imagePath,
        alt: location.name,
      };
    });
  }
}
