import { Component, OnInit, ViewChild } from '@angular/core';
import { MovimientoFormComponent } from '../movimiento-form/movimiento-form.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MovimientoService } from '../../service/movimiento.service';
import { ProductService } from '../../service/product.service';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movimientos',
  imports: [MatIconModule,MatFormFieldModule, MatInputModule,MatTableModule,CommonModule,RouterModule],
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.scss',
  providers: [DatePipe]
})
export class MovimientosComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'producto', 'tipo', 'cantidad', 'usuario', 'acciones'];
  dataSource: MatTableDataSource<any>;
  productos: any[] = [];
  movimientos: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private movimientoService: MovimientoService,
    private productoService: ProductService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.loadMovimientos();
    this.loadProductos();
  }

  loadMovimientos(): void {
    this.movimientoService.getMovimientos().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data); // ← Verifica esto en la consola
        this.dataSource.data = data;
      },
      error: (err) => console.error('Error:', err)
    });
  }
  loadProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  getProductoNombre(id: string): string {
    const producto = this.productos.find(p => p._id === id);
    return producto ? producto.nombre : 'Desconocido';
    
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteMovimiento(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar Movimiento', message: '¿Estás seguro?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.movimientoService.eliminarMovimiento(id).subscribe({
          next: () => this.loadMovimientos(),
          error: (err) => console.error('Error al eliminar movimiento:', err)
        });
      }
    });
  }

  openFormDialog(movimiento?: any): void {
    const dialogRef = this.dialog.open(MovimientoFormComponent, {
      width: '500px',
      data: { 
        movimiento: movimiento || null,
        productos: this.productos 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadMovimientos();
    });
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm') || '';
  }
}
