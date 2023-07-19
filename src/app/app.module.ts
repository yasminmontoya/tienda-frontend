import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductoComponent } from './components/producto/producto.component';
import { ListaDeseosComponent } from './components/lista-deseos/lista-deseos.component';
import { DeseoComponent } from './components/deseo/deseo.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    ProductoComponent,
    ListaDeseosComponent,
    DeseoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
