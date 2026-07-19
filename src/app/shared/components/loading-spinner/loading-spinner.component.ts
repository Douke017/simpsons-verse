import { Component, input } from '@angular/core';
import { IonSpinner } from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [IonSpinner],
  template: `
    <div class="loading-spinner-container">
      <ion-spinner name="crescent" color="primary"></ion-spinner>
      <p>{{ message() }}</p>
    </div>
  `,
  styles: [`
    .loading-spinner-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px;
      text-align: center;
      color: #8c8c8c;
      font-family: 'Plus Jakarta Sans', sans-serif;
      gap: 16px;

      p {
        margin: 0;
        font-size: 0.95rem;
        font-weight: 500;
      }
    }
  `]
})
export class LoadingSpinnerComponent {
  public readonly message = input<string>('Cargando...');
}
