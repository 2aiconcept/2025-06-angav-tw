import { inject, Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, LoginCredentials, RegisterData } from '@auth/interfaces';
import { IUser } from '@shared/interfaces';
import { ApiService, StorageService } from '@shared/services';
import { Observable, tap, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
  private apiService = inject(ApiService);
  private storageService = inject(StorageService);

  // Signals pour l'état d'authentification
  private currentUser = signal<IUser | null>(null);
  private token = signal<string | null>(null);

  // Computed signals
  isLoggedIn = computed(() => !!this.currentUser() && !!this.token());
  user = computed(() => this.currentUser());

  constructor() {
    this.loadUserFromStorage();
  }

  signup(userData: RegisterData): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/register', userData).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        console.error('Signup error:', error);
        throw error;
      })
    );
  }

  signin(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/login', credentials).pipe(
      tap((response) => this.handleAuthSuccess(response)),
      catchError((error) => {
        console.error('Signin error:', error);
        throw error;
      })
    );
  }

  logout(): void {
    this.currentUser.set(null);
    this.token.set(null);
    this.storageService.removeItem('auth_token');
    this.storageService.removeItem('current_user');
    this.router.navigate(['/signin']);
  }

  private handleAuthSuccess(response: AuthResponse): void {
    this.currentUser.set(response.user);
    this.token.set(response.accessToken);
    this.storageService.setItem('auth_token', response.accessToken);
    this.storageService.setItem('current_user', JSON.stringify(response.user));
    this.router.navigate(['/dashboard']);
  }

  private loadUserFromStorage(): void {
    const token = this.storageService.getItem('auth_token');
    const userStr = this.storageService.getItem('current_user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.token.set(token);
        this.currentUser.set(user);
      } catch (error) {
        console.error('Error loading user from storage:', error);
        this.logout();
      }
    }
  }

  getToken(): string | null {
    return this.token();
  }
}
