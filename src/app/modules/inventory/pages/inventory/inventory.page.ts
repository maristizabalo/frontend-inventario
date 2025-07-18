import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ListProductsComponent } from '../../components/list-products/list-products.component';

@Component({
  standalone: true,
  selector: 'app-inventory',
  template: `
    <ion-content class="ion-padding">
      <h1>Inventario</h1>
      <app-list-products></app-list-products>
      <ion-button expand="block" (click)="logout()">Cerrar sesión</ion-button>
    </ion-content>
  `,
  imports: [IonicModule, CommonModule, ListProductsComponent],
})
export class InventoryPage {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
