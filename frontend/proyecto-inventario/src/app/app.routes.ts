import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, 
  
  { 
    path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'productos', 
    component: ProductosComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'categorias', 
    component: CategoriasComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'movimientos', 
    component: MovimientosComponent, 
    canActivate: [AuthGuard] 
  },

  
  { path: '**', redirectTo: 'login' }
];