import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from '../../service/categoria.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-categoria-form',
  imports: [MatFormFieldModule, MatInputModule,MatDialogModule,ReactiveFormsModule],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Editar' : 'Nueva' }} Categoría</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <mat-form-field appearance="fill">
          <mat-label>Nombre</mat-label>
          <input matInput formControlName="nombre" required>
        </mat-form-field>
        <mat-form-field appearance="fill">
          <mat-label>Descripción</mat-label>
          <textarea matInput formControlName="descripcion"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-button color="primary" [disabled]="form.invalid" (click)="save()">Guardar</button>
    </mat-dialog-actions>
  `
})
export class CategoriaFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<CategoriaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      descripcion: [this.data?.descripcion || '']
    });
  }

  save(): void {
    const categoria = this.form.value;
    const request = this.data?._id
      ? this.categoriaService.actualizarCategoria(this.data._id, categoria)
      : this.categoriaService.crearCategoria(categoria);

    request.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error al guardar:', err)
    });
  }
}
