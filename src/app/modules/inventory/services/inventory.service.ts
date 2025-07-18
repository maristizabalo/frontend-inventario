import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/core/config/auth.config';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = API_CONFIG.INVENTORY;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createProduct(data: any) {
    return this.http.post(API_CONFIG.INVENTORY, data);
  }
}
