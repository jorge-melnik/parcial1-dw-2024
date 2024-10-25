import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonContent, RouterLink],
  templateUrl: './home.page.html',
})
export class HomePageComponent {}
