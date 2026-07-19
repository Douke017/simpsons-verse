import { Component, input, inject } from '@angular/core';
import { Location } from '@angular/common';
import { IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonButton],
})
export class HeaderComponent {
  private readonly location = inject(Location);

  public readonly title = input<string>('');
  public readonly showBackButton = input<boolean>(false);

  public goBack(): void {
    this.location.back();
  }
}
