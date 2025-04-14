import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth'; 
  private currentUserSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage(); 
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        this.saveAuthData(response.token, response.user);
        this.currentUserSubject.next(response.user);
        this.router.navigate(['/dashboard']);
      })
    );
  }

  private saveAuthData(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  private loadUserFromStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  getCurrentUser() {
    return this.currentUserSubject.asObservable();
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.rol === 'ADMIN';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}