import { Component } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { ProductService } from '../../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-productos',
  imports: [],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {

  productos: any[] = [];
  categorias: any[] = [];
  displayedColumns: string[] = ['nombre', 'precio', 'stock', 'categoria', 'acciones'];

  constructor(
    private productoService: ProductService,
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProductos();
    this.loadCategorias();
  }

  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error al cargar productos:', err)
    });
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  getCategoriaNombre(id: string): string {
    const categoria = this.categorias.find(c => c._id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

  openFormDialog(producto?: any): void {
    const dialogRef = this.dialog.open(ProductoFormComponent, {
      width: '600px',
      data: { producto: producto || null, categorias: this.categorias }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProductos();
    });
  }

  deleteProducto(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar Producto', message: '¿Estás seguro?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.productoService.eliminarProducto(id).subscribe({
          next: () => this.loadProductos(),
          error: (err) => console.error('Error al eliminar:', err)
        });
      }
    });
  }

}
