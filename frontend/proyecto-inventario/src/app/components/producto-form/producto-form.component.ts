import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductService } from '../../service/product.service';
import { CategoriaService } from '../../service/categoria.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-producto-form',
  imports: [MatFormFieldModule, MatInputModule,MatDialogModule,ReactiveFormsModule,MatSelectModule,CommonModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss']
})
export class ProductoFormComponent implements OnInit {
  form!: FormGroup;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductService,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ProductoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { producto: any, categorias: any[] }
  ) {
    this.categorias = data.categorias || [];
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      nombre: [this.data.producto?.nombre || '', [Validators.required, Validators.maxLength(100)]],
      descripcion: [this.data.producto?.descripcion || '', Validators.maxLength(255)],
      precio: [this.data.producto?.precio || 0, [Validators.required, Validators.min(0.01)]],
      stock: [this.data.producto?.stock || 0, [Validators.required, Validators.min(0)]],
      categoria: [this.data.producto?.categoria || null, Validators.required]
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const productoData = this.form.value;
    const request = this.data.producto?._id
      ? this.productoService.actualizarProducto(this.data.producto._id, productoData)
      : this.productoService.crearProducto(productoData);

    request.subscribe({
      next: () => this.dialogRef.close(true),
      error: (err) => console.error('Error al guardar producto:', err)
    });
  }

  getFieldError(field: string): string {
    const control = this.form.get(field);
    if (control?.hasError('required')) return 'Campo obligatorio';
    if (control?.hasError('min')) return `El valor mínimo es ${control.errors?.['min'].min}`;
    if (control?.hasError('maxlength')) return `Máximo ${control.errors?.['maxlength'].requiredLength} caracteres`;
    return '';
  }
}
