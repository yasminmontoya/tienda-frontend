import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { ListaDeseosComponent } from './components/lista-deseos/lista-deseos.component';

const routes: Routes = [
  {path : 'productos',component:ListaProductosComponent},
  {path:'',redirectTo:'productos',pathMatch:'full'},
  {path : 'deseos',component:ListaDeseosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
