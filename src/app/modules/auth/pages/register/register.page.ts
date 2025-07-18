import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';

@Component({
  standalone: true,
  selector: 'app-register',
  template: `
    <ion-content class="ion-padding">
      <h1>Crear Cuenta</h1>
      <app-auth-form
        [type]="'register'"
        (onSubmit)="handleSubmit($event)"
        (onNavigate)="goToLogin()"
      >
      </app-auth-form>
    </ion-content>
  `,
  imports: [IonicModule, CommonModule, AuthFormComponent],
})
export class RegisterPage {
  constructor(private router: Router) {}

  handleSubmit(type: 'login' | 'register') {
    if (type === 'register') {
      this.router.navigate(['/login']);
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
