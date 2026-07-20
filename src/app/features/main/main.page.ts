import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IonList, IonListHeader, IonRouterOutlet, IonMenuToggle, IonLabel, IonSplitPane, IonIcon, IonMenu, IonContent, IonItem } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, person, play, map, heart } from 'ionicons/icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [RouterLink, IonList, IonListHeader, IonRouterOutlet, IonMenuToggle, IonLabel, IonSplitPane, IonIcon, IonMenu, IonContent, IonItem]
})
export class MainPage {
  public appPages = [
    { title: 'Inicio', url: '/main/home', icon: 'home' },
    { title: 'Personajes', url: '/main/characters', icon: 'person' },
    { title: 'Episodios', url: '/main/episodes', icon: 'play' },
    { title: 'Ubicaciones', url: '/main/locations', icon: 'map' },
    { title: 'Favoritos', url: '/main/favorites', icon: 'heart' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons({ home, person, play, map, heart });
  }

  ngOnInit() {
  }

}
