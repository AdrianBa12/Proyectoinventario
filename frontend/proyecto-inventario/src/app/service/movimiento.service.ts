import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovimientoService {
  private apiUrl = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) {}

  // Obtener todos los movimientos
  getMovimientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un movimiento (ej: entrada/salida de productos)
  crearMovimiento(movimiento: {
    producto: string,
    tipo: 'ENTRADA' | 'SALIDA',
    cantidad: number,
    usuario: string
  }): Observable<any> {
    return this.http.post(this.apiUrl, movimiento);
  }

  // Obtener movimientos de un producto específico (opcional)
  getMovimientosPorProducto(productoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?producto=${productoId}`);
  }
}