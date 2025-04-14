import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MovimientoService } from '../../service/movimiento.service';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-movimiento-form',
  imports: [MatDialogModule,MatFormFieldModule,MatSelectModule,CommonModule,ReactiveFormsModule],
  templateUrl: './movimiento-form.component.html',
  styleUrl: './movimiento-form.component.css'
})
export class MovimientoFormComponent {
  movimientoForm: FormGroup;
  tipos = ['ENTRADA', 'SALIDA'];

  constructor(
    private fb: FormBuilder,
    private movimientoService: MovimientoService,
    private dialogRef: MatDialogRef<MovimientoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.movimientoForm = this.fb.group({
      producto: [data.movimiento?.producto || '', Validators.required],
      tipo: [data.movimiento?.tipo || 'ENTRADA', Validators.required],
      cantidad: [data.movimiento?.cantidad || 1, [Validators.required, Validators.min(1)]],
      fecha: [data.movimiento?.fecha || new Date()]
    });
  }

  save(): void {
    if (this.movimientoForm.valid) {
      const formData = this.movimientoForm.value;
      
      
      formData.cantidad = Number(formData.cantidad);
  
      const request = this.data.movimiento?._id
        ? this.movimientoService.actualizarMovimiento(this.data.movimiento._id, formData)
        : this.movimientoService.crearMovimiento(formData);
  
      request.subscribe({
        next: () => {
          this.dialogRef.close(true);
          
        },
        error: (err) => {
          console.error('Error detallado:', err);
          
          let errorMessage = 'Error al guardar el movimiento';
          if (err.status === 404) {
            errorMessage = 'Recurso no encontrado';
          } else if (err.error?.message) {
            errorMessage = err.error.message;
          }
          
          
          alert(errorMessage);
        }
      });
    }
  }

}
