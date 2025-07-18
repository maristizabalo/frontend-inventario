import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { ListProductsComponent } from '../../components/list-products/list-products.component';
import { ViewChild } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';

@Component({
  standalone: true,
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ListProductsComponent,
  ],
})
export class InventoryPage {
  showForm = false;
  form = this.fb.group({
    nombre: [''],
    descripcion: [''],
    stock: [0],
  });

  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryService,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router
  ) {}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addProduct() {
    this.inventoryService.createProduct(this.form.value).subscribe({
      next: async () => {
        await this.showToast('Producto agregado correctamente.', 'success');
        this.showForm = false;
        this.form.reset({ nombre: '', descripcion: '', stock: 0 });
        this.listProductsComponent?.loadProducts();
      },
      error: async (err) => {
        await this.showToast(err, 'danger');
      },
    });
  }

  async showToast(message: string, color: 'success' | 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'top',
    });
    await toast.present();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  @ViewChild(ListProductsComponent)
  listProductsComponent?: ListProductsComponent;
}
