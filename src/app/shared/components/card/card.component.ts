import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { UpperCasePipe } from '../../pipes/upper-case.pipe';
import { FormatDatePipe } from '../../pipes/format-date.pipe';

@Component({
  selector: 'app-card',
  templateUrl: 'card.component.html',
  styleUrls: ['card.component.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, UpperCasePipe, FormatDatePipe],
})
export class CardComponent {
  @Input() title = 'Card Title';
  @Input() subtitle = 'Card Subtitle';
  @Input() content = 'Here is a small text description for the card content.';
  @Input() image = 'https://ionicframework.com/docs/img/demos/card-media.png';
  @Input() alt = 'Character image';
  @Input() age: number | null = null;
  @Input() firstAppearanceTitle: string | null = null;
  @Input() firstAppearanceDate: string | null = null;
}
