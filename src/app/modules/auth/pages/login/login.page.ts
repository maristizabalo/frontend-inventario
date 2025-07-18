import { Router } from '@angular/router';
import { AuthFormComponent } from '../../components/auth-form/auth-form.component';
import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  standalone: true,
  imports: [AuthFormComponent, IonContent],
  template: `
    <ion-content class="ion-padding">
      <h1>Iniciar Sesión</h1>
      <app-auth-form
        [type]="'login'"
        (onSubmit)="handleSubmit($event)"
        (onNavigate)="goToRegister()"
      >
      </app-auth-form>
    </ion-content>
  `,
})
export class LoginPage {
  constructor(private router: Router) {}

  handleSubmit(type: 'login' | 'register') {
    if (type === 'login') {
      this.router.navigate(['/inventory']);
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
