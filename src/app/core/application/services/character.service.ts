import { Injectable, inject, signal, computed } from '@angular/core';
import { GetCharactersUseCase } from '../use-cases/get-characters.usecase';
import { Character } from '../../domain/interfaces/character.interface';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private readonly getCharactersUseCase = inject(GetCharactersUseCase);

  // States (Domain models)
  public readonly charactersList = signal<Character[]>([]);
  public readonly isLoading = signal<boolean>(false);
  public readonly error = signal<string | null>(null);
  public readonly currentPage = signal<number>(1);
  public readonly hasMore = signal<boolean>(true);
  public readonly searchQuery = signal<string>('');

  // Computed filtered list (Domain models)
  public readonly filteredCharacters = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const list = this.charactersList();
    if (!query) return list;
    return list.filter(char => 
      char.name.toLowerCase().includes(query) ||
      (char.occupation && char.occupation.toLowerCase().includes(query))
    );
  });

  public loadInitialPage(): void {
    if (this.charactersList().length > 0) {
      return;
    }
    this.goToPage(1);
  }

  public goToPage(page: number): void {
    if (page < 1 || this.isLoading()) return;

    this.isLoading.set(true);
    this.error.set(null);

    this.getCharactersUseCase.execute(page)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (chars) => {
          this.charactersList.set(chars);
          this.currentPage.set(page);
          this.hasMore.set(chars.length === 20);
        },
        error: () => {
          this.error.set('No se pudieron cargar los personajes de Springfield.');
        }
      });
  }

  public setSearchQuery(query: string): void {
    this.searchQuery.set(query);
  }
}
