import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  template: `
    <div class="search-bar-wrapper">
      <span class="material-symbols-outlined search-bar-icon">search</span>
      <input 
        type="text" 
        class="search-bar-input" 
        [placeholder]="placeholder()" 
        [value]="value()"
        (input)="onInputChange($event)" />
    </div>
  `,
  styles: [`
    .search-bar-wrapper {
      position: relative;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-bar-icon {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translateY(-50%);
      color: #737373;
      font-size: 1.3rem;
      pointer-events: none;
    }

    .search-bar-input {
      width: 100%;
      background: var(--color-surface-container-low, #1c1b1b);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 12px;
      padding: 14px 16px 14px 48px;
      color: #ffffff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.25s ease, box-shadow 0.25s ease;

      &:focus {
        border-color: rgba(254, 212, 29, 0.3);
        box-shadow: 0 0 0 3px rgba(254, 212, 29, 0.05);
      }

      &::placeholder {
        color: #737373;
      }
    }
  `]
})
export class SearchBarComponent {
  public readonly placeholder = input<string>('Buscar...');
  public readonly value = input<string>('');
  public readonly queryChange = output<string>();

  public onInputChange(event: Event): void {
    const inputEl = event.target as HTMLInputElement;
    this.queryChange.emit(inputEl.value);
  }
}
