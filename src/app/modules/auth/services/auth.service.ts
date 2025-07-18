import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { API_CONFIG } from 'src/app/core/config/auth.config';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = API_CONFIG.AUTH;

  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http
      .post<any>(`${this.apiUrl}token/`, credentials)
      .pipe(catchError(this.handleError));
  }

  register(data: { username: string; password: string }) {
    return this.http
      .post(`${this.apiUrl}users/register/`, data)
      .pipe(catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'Error desconocido, intenta más tarde.';
    if (error.error?.detail) {
      message = error.error.detail;
    } else if (error.error?.message) {
      message = error.error.message;
    }
    return throwError(() => message);
  }
}
