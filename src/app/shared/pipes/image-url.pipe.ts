import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpsonsImageUrl',
  standalone: true,
})
export class SimpsonsImageUrlPipe implements PipeTransform {
  transform(portraitPath: string | null | undefined): string {
    if (!portraitPath) {
      return 'https://ionicframework.com/docs/img/demos/card-media.png';
    }

    return `https://cdn.thesimpsonsapi.com/500${portraitPath}`;
  }
}
