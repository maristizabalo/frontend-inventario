import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts(event?: any) {
    this.inventoryService.getProducts().subscribe({
      next: (res) => {
        this.products = res;
        if (event) event.target.complete();
      },
      error: (err) => {
        console.error(err);
        if (event) event.target.complete();
      },
    });
  }
}
