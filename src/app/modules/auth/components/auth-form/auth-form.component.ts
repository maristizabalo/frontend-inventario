import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, LoadingController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { person, lockClosed } from 'ionicons/icons';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  @Input() type: 'login' | 'register' = 'login';
  @Output() onSubmit = new EventEmitter<'login' | 'register'>();
  @Output() onNavigate = new EventEmitter<void>();

  form = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    addIcons({ person, lockClosed });
  }

  async showErrorToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }

  async showSuccessToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'top',
    });
    await toast.present();
  }

  async submit() {
    const loading = await this.loadingCtrl.create({
      message: this.type === 'login' ? 'Iniciando sesión...' : 'Registrando...',
      spinner: 'crescent',
    });
    await loading.present();

    if (this.type === 'login') {
      this.authService
        .login(this.form.value as { username: string; password: string })
        .subscribe({
          next: async (res) => {
            localStorage.setItem('access_token', res.access);
            await loading.dismiss();
            await this.showSuccessToast('¡Inicio de sesión exitoso!');
            this.onSubmit.emit('login');
          },
          error: async (err) => {
            await loading.dismiss();
            await this.showErrorToast(err);
          },
        });
    } else {
      this.authService
        .register(this.form.value as { username: string; password: string })
        .subscribe({
          next: async () => {
            await loading.dismiss();
            await this.showSuccessToast('¡Usuario registrado correctamente!');
            this.onSubmit.emit('register');
          },
          error: async (err) => {
            await loading.dismiss();
            await this.showErrorToast(err);
          },
        });
    }
  }

  navigate() {
    this.onNavigate.emit();
  }

  get actionText() {
    return this.type === 'login' ? 'Iniciar Sesión' : 'Registrarse';
  }

  get toggleText() {
    return this.type === 'login'
      ? '¿No tienes cuenta? Regístrate'
      : '¿Ya tienes cuenta? Inicia sesión';
  }
}
