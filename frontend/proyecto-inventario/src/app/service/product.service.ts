import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearProducto(producto: any): Observable<any> {
    return this.http.post(this.apiUrl, producto);
  }

  actualizarProducto(id: string, producto: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, producto);
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
  getProductosPorCategoria(categoriaId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?categoria=${categoriaId}`);
  }
}