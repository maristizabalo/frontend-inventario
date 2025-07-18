import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonicModule,
  AlertController,
  ToastController,
  LoadingController,
} from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';
import { MovementService } from 'src/app/modules/movement/services/movement.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  products: any[] = [];
  loading: boolean = false;

  constructor(
    private inventoryService: InventoryService,
    private movementService: MovementService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: any) {
    this.loading = true;
    this.inventoryService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        if (event) event.target.complete();
      },
    });
  }

  async promptForQuantity(productId: number, tipo: 'entrada' | 'salida') {
    const alert = await this.alertCtrl.create({
      header: `Registrar ${tipo}`,
      inputs: [
        {
          name: 'cantidad',
          type: 'number',
          placeholder: 'Cantidad',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            const cantidad = Number(data.cantidad);
            if (!cantidad || cantidad <= 0) {
              this.showToast('Ingresa una cantidad válida', 'danger');
              return false;
            }
            this.registerMovement(productId, tipo, cantidad);
            return true;
          },
        },
      ],
    });

    await alert.present();
  }

  async registerMovement(
    productId: number,
    tipo: 'entrada' | 'salida',
    cantidad: number
  ) {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando...',
      spinner: 'crescent',
      backdropDismiss: false,
    });
    await loading.present();

    const data = {
      producto_id: productId,
      tipo,
      cantidad,
    };

    this.movementService.createMovement(data).subscribe({
      next: async () => {
        await loading.dismiss();
        await this.showToast(`Registro de ${tipo} exitoso`, 'success');
        this.loadProducts();
      },
      error: async (err) => {
        await loading.dismiss();
        const errorMessage = err.error?.error || 'Ocurrió un error inesperado.';
        await this.showToast(errorMessage, 'danger');
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
}
