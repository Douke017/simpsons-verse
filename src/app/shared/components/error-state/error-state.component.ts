import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  template: `
    <div class="error-state-container">
      <p class="error-msg">{{ message() }}</p>
      <button class="btn-retry" (click)="retry.emit()">{{ buttonText() }}</button>
    </div>
  `,
  styles: [`
    .error-state-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 32px;
      text-align: center;
      gap: 16px;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .error-msg {
      margin: 0;
      font-size: 0.95rem;
      font-weight: 500;
      color: #f87171;
    }

    .btn-retry {
      background: var(--color-primary, #fed41d);
      color: #121212;
      border: none;
      border-radius: 8px;
      padding: 10px 24px;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.15s ease, filter 0.15s ease;

      &:hover {
        filter: brightness(1.05);
      }

      &:active {
        transform: scale(0.97);
      }
    }
  `]
})
export class ErrorStateComponent {
  public readonly message = input<string>('Ocurrió un error al cargar la información.');
  public readonly buttonText = input<string>('Reintentar');
  public readonly retry = output<void>();
}
