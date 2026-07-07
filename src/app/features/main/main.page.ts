import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IonApp, IonList, IonListHeader, IonRouterOutlet, IonMenuToggle, IonLabel, IonNote, IonSplitPane, IonIcon, IonMenu, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, IonApp, IonList, IonListHeader, IonRouterOutlet, IonMenuToggle, IonLabel, IonNote, IonSplitPane, IonIcon, IonMenu, IonContent, IonHeader, IonTitle, IonToolbar]
})
export class MainPage {
  AppComponent = MainPage;
  constructor() { }

  ngOnInit() {
  }

}
