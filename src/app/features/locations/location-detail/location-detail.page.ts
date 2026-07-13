import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonSpinner,
  IonButton
} from '@ionic/angular/standalone';
import { SimpsonsImageUrlPipe } from '../../../shared/pipes/image-url.pipe';
import { GetLocationByIdUseCase } from '../../../core/application/use-cases/get-location-by-id.usecase';
import { Location } from '../../../core/domain/interfaces/location.interface';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
  standalone: true,
  imports: [
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonSpinner,
    IonButton,
    SimpsonsImageUrlPipe
  ],
})
export class LocationDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly getLocationByIdUseCase = inject(GetLocationByIdUseCase);

  // States
  public readonly location = signal<Location | null>(null);
  public readonly isLoading = signal<boolean>(true);
  public readonly error = signal<string | null>(null);

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id) {
      this.getLocationByIdUseCase.execute(id).subscribe({
        next: (loc) => {
          this.location.set(loc);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('No se pudo cargar la información del punto de interés.');
          this.isLoading.set(false);
        }
      });
    } else {
      this.error.set('ID de ubicación no válido.');
      this.isLoading.set(false);
    }
  }

  public shareLocation(): void {
    const loc = this.location();
    if (loc && navigator.share) {
      navigator.share({
        title: `${loc.name} - Springfield Explorer`,
        text: `¡Echa un vistazo a ${loc.name} en Springfield!`,
        url: window.location.href
      }).catch(() => {});
    }
  }
}
