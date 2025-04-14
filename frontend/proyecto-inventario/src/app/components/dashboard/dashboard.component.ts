import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { ProductService } from '../../service/product.service';
import { CategoriaService } from '../../service/categoria.service';
import { MovimientoService } from '../../service/movimiento.service';
import { RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  user: any;
  stats: any = {
    totalProductos: 0,
    totalCategorias: 0,
    movimientosHoy: 0
  };
  productosRecientes: any[] = [];
  categorias: any[] = [];

  categoriaMap: { [key: string]: string } = {}; 

  constructor(
    private authService: AuthService,
    private productoService: ProductService,
    private categoriaService: CategoriaService,
    private movimientoService: MovimientoService
  ) {}

  ngOnInit() {
    this.loadUser();
    this.loadStats();
    forkJoin([
      this.productoService.getProductos(),
      this.categoriaService.getCategorias()
    ]).subscribe(([productos, categorias]) => {
      this.productosRecientes = productos
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
      this.categorias = categorias;
      categorias.forEach(categoria => {
        this.categoriaMap[categoria._id] = categoria.nombre;
      });
      console.log("categoriaMap llenado:", this.categoriaMap);
    });
  }
  
  getCategoriaName(categoriaId: string): string {
    return this.categoriaMap[categoriaId] || 'Desconocido';
  }

  loadUser() {
    this.authService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  loadStats() {
    this.productoService.getProductos().subscribe(productos => {
      this.stats.totalProductos = productos.length;
    });

    this.categoriaService.getCategorias().subscribe(categorias => {
      this.stats.totalCategorias = categorias.length;
    });

    this.movimientoService.getMovimientos().subscribe(movimientos => {
      const hoy = new Date().toISOString().split('T')[0];
      this.stats.movimientosHoy = movimientos.filter((m: any) => 
        m.fecha.split('T')[0] === hoy
      ).length;
    });
  }
  
  loadProductosRecientes() {
    this.productoService.getProductos().subscribe(productos => {
      this.productosRecientes = productos
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10);
        console.log("Productos Recientes:", this.productosRecientes); 
    });
  }

  loadCategorias() {
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.categorias = categorias;
      categorias.forEach(categoria => {
        this.categoriaMap[categoria._id] = categoria.nombre;
      });
      console.log("categoriaMap llenado:", this.categoriaMap);
    });
  }

  

  logout() {
    this.authService.logout();
  }
  
    
}
