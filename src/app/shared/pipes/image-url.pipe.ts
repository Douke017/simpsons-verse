import { Pipe, PipeTransform } from '@angular/core';
import {
  DEFAULT_CHARACTER_IMAGE_SIZE,
  DEFAULT_CHARACTER_IMAGE_URL,
  SIMPSONS_IMAGE_BASE_URL,
  ImageSize,
} from '../config/api.config';

@Pipe({
  name: 'simpsonsImageUrl',
  standalone: true,
})
export class SimpsonsImageUrlPipe implements PipeTransform {
  transform(portraitPath: string | null | undefined, size: ImageSize = DEFAULT_CHARACTER_IMAGE_SIZE): string {
    if (!portraitPath) {
      return DEFAULT_CHARACTER_IMAGE_URL;
    }

    return `${SIMPSONS_IMAGE_BASE_URL}/${size}${portraitPath}`;
  }
}
