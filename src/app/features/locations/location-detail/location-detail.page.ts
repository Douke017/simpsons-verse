import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location as AngularLocation } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { SimpsonsImageUrlPipe } from '../../../shared/pipes/image-url.pipe';
import { GetLocationByIdUseCase } from '../../../core/application/use-cases/get-location-by-id.usecase';
import { Location } from '../../../core/domain/interfaces/location.interface';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.page.html',
  styleUrls: ['./location-detail.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    SimpsonsImageUrlPipe,
    HeaderComponent,
    LoadingSpinnerComponent,
    ErrorStateComponent
  ],
})
export class LocationDetailPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly getLocationByIdUseCase = inject(GetLocationByIdUseCase);
  private readonly locationHelper = inject(AngularLocation);

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

  public goBack(): void {
    this.locationHelper.back();
  }

  public shareLocation(): void {
    const loc = this.location();
    if (loc && navigator.share) {
      navigator.share({
        title: `${loc.name} - SimpsonsVerse`,
        text: `¡Echa un vistazo a ${loc.name} en SimpsonsVerse!`,
        url: window.location.href
      }).catch(() => {});
    }
  }
}
