import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSpinner } from '@ionic/angular/standalone';
import { map } from 'rxjs/operators';
import { CardComponent } from '../../shared/components/card/card.component';
import { SimpsonsImageUrlPipe } from '../../shared/pipes/image-url.pipe';
import { GetCharactersUseCase } from '../../core/application/use-cases/get-characters.usecase';
import { CharactersPresenter } from './characters.presenter';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [CardComponent, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonSpinner, SimpsonsImageUrlPipe],
})
export class CharactersPage {
  private readonly getCharactersUseCase = inject(GetCharactersUseCase);
  private readonly presenter = inject(CharactersPresenter);

  public readonly characters = toSignal(
    this.getCharactersUseCase.execute().pipe(
      map((characters) => this.presenter.toCardViewModels(characters))
    ),
    { initialValue: [] }
  );
}
