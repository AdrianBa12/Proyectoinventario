import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = `${environment.apiUrl}/movimientos`;

  constructor(private http: HttpClient) { }

  getMovimientos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearMovimiento(movimiento: any): Observable<any> {
    return this.http.post(this.apiUrl, movimiento);
  }

  actualizarMovimiento(id: string, movimiento: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, movimiento);
  }

  eliminarMovimiento(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMovimientosPorProducto(productoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/producto/${productoId}`);
  }

  getMovimientosPorFecha(inicio: string, fin: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/fecha?inicio=${inicio}&fin=${fin}`);
  }
}