import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../service/categoria.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-categorias',
  imports: [MatIconModule,MatTableModule],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent implements OnInit {
  categorias: any[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  openFormDialog(categoria?: any): void {
    const dialogRef = this.dialog.open(CategoriaFormComponent, {
      width: '500px',
      data: categoria || null
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadCategorias();
    });
  }

  deleteCategoria(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Eliminar Categoría', message: '¿Estás seguro?' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.categoriaService.eliminarCategoria(id).subscribe({
          next: () => this.loadCategorias(),
          error: (err) => console.error('Error al eliminar:', err)
        });
      }
    });
  }
}