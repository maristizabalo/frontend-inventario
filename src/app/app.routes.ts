import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginPage } from './modules/auth/pages/login/login.page';
import { RegisterPage } from './modules/auth/pages/register/register.page';
import { InventoryPage } from './modules/inventory/pages/inventory/inventory.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'register',
    component: RegisterPage,
  },
  {
    path: 'inventory',
    component: InventoryPage,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
