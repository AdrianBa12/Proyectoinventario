import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {} // <- inyectar HttpClient

  getDashboardData() {
    return this.http.get(`${this.baseUrl}/dashboard`);
  }
}
