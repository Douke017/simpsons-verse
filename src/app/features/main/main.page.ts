import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { IonList, IonListHeader, IonRouterOutlet, IonMenuToggle, IonLabel, IonNote, IonSplitPane, IonIcon, IonMenu, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, person, play, map } from 'ionicons/icons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonList, IonListHeader, IonRouterOutlet, IonMenuToggle, IonLabel, IonNote, IonSplitPane, IonIcon, IonMenu, IonContent, IonHeader, IonTitle, IonToolbar]
})
export class MainPage {
  public appPages = [
    { title: 'Home', url: '/main/home', icon: 'home' },
    { title: 'Characters', url: '/main/characters', icon: 'person' },
    { title: 'Episodes', url: '/main/episodes', icon: 'play' },
    { title: 'Locations', url: '/main/locations', icon: 'map' }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor() {
    addIcons({ home, person, play, map });
  }

  ngOnInit() {
  }

}
