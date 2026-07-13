import { Component, input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { UpperCasePipe } from '../../pipes/upper-case.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';
import { DEFAULT_CHARACTER_IMAGE_URL } from '../../config/api.config';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, UpperCasePipe, FormatDatePipe],
})
export class CardComponent {
  title = input<string>('Card Title');
  subtitle = input<string>('Card Subtitle');
  content = input<string>('Here is a small text description for the card content.');
  image = input<string>(DEFAULT_CHARACTER_IMAGE_URL);
  alt = input<string>('Character image');
  age = input<number | null>(null);
  birthdate = input<string | null>(null);
  dateLabel = input<string>('Birthdate');
  gender = input<string>('');
  occupation = input<string>('');
  status = input<string>('');
}
