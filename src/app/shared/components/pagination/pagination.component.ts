import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  template: `
    <div class="pagination-container">
      <button 
        class="pagination-btn" 
        [disabled]="currentPage() <= 1" 
        (click)="onPageChange(currentPage() - 1)">
        <span class="material-symbols-outlined">chevron_left</span>
        Anterior
      </button>
      
      <span class="page-indicator">
        Pág. <span class="page-number">{{ currentPage() }}</span>
      </span>
      
      <button 
        class="pagination-btn" 
        [disabled]="!hasMore()" 
        (click)="onPageChange(currentPage() + 1)">
        Siguiente
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  `,
  styles: [`
    .pagination-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 24px 16px;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .pagination-btn {
      background: #1c1b1b;
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #ffffff;
      border-radius: 8px;
      padding: 8px 16px;
      font-size: 0.85rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 6px;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.15s ease, border-color 0.2s;

      &:hover:not(:disabled) {
        background-color: #2a2a2a;
        border-color: rgba(254, 212, 29, 0.3);
      }

      &:active:not(:disabled) {
        transform: scale(0.97);
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      span {
        font-size: 1.1rem;
      }
    }

    .page-indicator {
      font-size: 0.9rem;
      color: #8c8c8c;
      font-weight: 500;
      
      .page-number {
        color: #fed41d;
        font-weight: 800;
      }
    }
  `]
})
export class PaginationComponent {
  public readonly currentPage = input<number>(1);
  public readonly hasMore = input<boolean>(true);
  public readonly pageChange = output<number>();

  public onPageChange(page: number): void {
    if (page >= 1) {
      this.pageChange.emit(page);
    }
  }
}
