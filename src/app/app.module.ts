import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { HttpClientModule } from '@angular/common/http';
import { ListaDeseosComponent } from './components/lista-deseos/lista-deseos.component';
import { ListaHistoricoComponent } from './components/lista-historico/lista-historico.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaProductosComponent,
    ListaDeseosComponent,
    ListaHistoricoComponent
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
