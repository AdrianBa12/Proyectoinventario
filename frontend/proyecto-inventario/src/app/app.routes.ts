import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductosComponent } from './components/productos/productos.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a login inicialmente
  { path: 'login', component: LoginComponent }, // Ruta pública
  
  // Rutas protegidas (requieren autenticación)
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

  // Ruta comodín (opcional: redirige a login si la ruta no existe)
  { path: '**', redirectTo: 'login' }
];