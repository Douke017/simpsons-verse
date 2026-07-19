import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { GetCharacterByIdUseCase } from '../../../core/application/use-cases/get-character-by-id.usecase';
import { Character } from '../../../core/domain/interfaces/character.interface';
import { SimpsonsImageUrlPipe } from '../../../shared/pipes/image-url.pipe';
import { calculateAge } from '../../../shared/utils/age.util';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.page.html',
  styleUrls: ['./character-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    SimpsonsImageUrlPipe,
    HeaderComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent
  ],
})
export class CharacterDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly getCharacterByIdUseCase = inject(GetCharacterByIdUseCase);
  private readonly location = inject(Location);

  // Character details signals
  public readonly character = signal<Character | null>(null);
  public readonly isLoading = signal<boolean>(true);
  public readonly error = signal<string | null>(null);

  // Age helper computed signal
  public readonly calculatedAge = computed(() => {
    const char = this.character();
    if (!char) return 'N/A';
    const age = calculateAge(char.birthdate);
    return age !== null ? age.toString() : 'N/A';
  });

  // Dynamic Family Ties mapping (maps Homer, Marge, Bart, Lisa, Maggie using real API IDs/URLs)
  public readonly familyTies = computed(() => {
    const char = this.character();
    if (!char) return [];

    const name = char.name.toLowerCase();
    
    const familyDb: Record<string, Array<{ name: string; role: string; image: string }>> = {
      'homer': [
        { name: 'Marge', role: 'Esposa', image: '/character/2.webp' },
        { name: 'Bart', role: 'Hijo', image: '/character/3.webp' },
        { name: 'Lisa', role: 'Hija', image: '/character/4.webp' },
        { name: 'Maggie', role: 'Hija', image: '/character/5.webp' }
      ],
      'marge': [
        { name: 'Homer', role: 'Esposo', image: '/character/1.webp' },
        { name: 'Bart', role: 'Hijo', image: '/character/3.webp' },
        { name: 'Lisa', role: 'Hija', image: '/character/4.webp' },
        { name: 'Maggie', role: 'Hija', image: '/character/5.webp' }
      ],
      'bart': [
        { name: 'Homer', role: 'Padre', image: '/character/1.webp' },
        { name: 'Marge', role: 'Madre', image: '/character/2.webp' },
        { name: 'Lisa', role: 'Hermana', image: '/character/4.webp' },
        { name: 'Maggie', role: 'Hermana', image: '/character/5.webp' }
      ],
      'lisa': [
        { name: 'Homer', role: 'Padre', image: '/character/1.webp' },
        { name: 'Marge', role: 'Madre', image: '/character/2.webp' },
        { name: 'Bart', role: 'Hermano', image: '/character/3.webp' },
        { name: 'Maggie', role: 'Hermana', image: '/character/5.webp' }
      ],
      'maggie': [
        { name: 'Homer', role: 'Padre', image: '/character/1.webp' },
        { name: 'Marge', role: 'Madre', image: '/character/2.webp' },
        { name: 'Bart', role: 'Hermano', image: '/character/3.webp' },
        { name: 'Lisa', role: 'Hermana', image: '/character/4.webp' }
      ]
    };

    // Find key match
    const matchedKey = Object.keys(familyDb).find((key) => name.includes(key));
    if (matchedKey) {
      return familyDb[matchedKey];
    }

    // Default general relations fallback
    return [
      { name: 'Homer Simpson', role: 'Amigo', image: '/character/1.webp' },
      { name: 'Marge Simpson', role: 'Amiga', image: '/character/2.webp' },
      { name: 'Bart Simpson', role: 'Colega', image: '/character/3.webp' }
    ];
  });

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.getCharacterByIdUseCase.execute(id).subscribe({
        next: (char) => {
          this.character.set(char);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar la información del personaje.');
          this.isLoading.set(false);
        }
      });
    } else {
      this.error.set('ID de personaje no válido.');
      this.isLoading.set(false);
    }
  }

  public goBack(): void {
    this.location.back();
  }

  public shareCharacter(): void {
    const char = this.character();
    if (char && navigator.share) {
      navigator.share({
        title: `${char.name} - SimpsonsVerse`,
        text: `¡Mira a ${char.name} en SimpsonsVerse!`,
        url: window.location.href
      }).catch(() => {});
    }
  }
}
