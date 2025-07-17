import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { person, lockClosed } from 'ionicons/icons';

@Component({
  selector: 'app-auth-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.scss',
})
export class AuthFormComponent {
  @Input() type: 'login' | 'register' = 'login';
  @Output() onSubmit = new EventEmitter<any>();
  @Output() onNavigate = new EventEmitter<void>();

  form = this.fb.group({
    username: [''],
    password: [''],
  });

  constructor(private fb: FormBuilder) {
    addIcons({ person, lockClosed });
  }

  submit() {
    this.onSubmit.emit(this.form.value);
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
