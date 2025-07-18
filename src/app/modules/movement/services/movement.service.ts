import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from 'src/app/core/config/api.config';

@Injectable({ providedIn: 'root' })
export class MovementService {
  private apiUrl = API_CONFIG.STOCK;

  constructor(private http: HttpClient) {}

  createMovement(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
