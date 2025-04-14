import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = `${environment.apiUrl}/categorias`;

  constructor(private http: HttpClient) {}

  // Obtener todas las categorías
  getCategorias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una categoría (opcional, si necesitas agregar desde el frontend)
  crearCategoria(categoria: { nombre: string, descripcion: string }): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
  }


  actualizarCategoria(id: string, categoria: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, categoria);
  }

  // Eliminar una categoría (opcional)
  eliminarCategoria(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}