import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { DeseoService } from 'src/app/services/deseo.service';
import { Deseo } from 'src/app/models/deseo';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HistoricoService } from 'src/app/services/historico.service';
import { Historico } from 'src/app/models/historico';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos:Producto[];
  deseo:Deseo;
  today = new Date();
  changedDate:any;
  pipe = new DatePipe('en-US');
  producto: Producto;
  deseos:Deseo[];
  historico:Historico;

  constructor(private productoServicio:ProductoService, private deseoServicio:DeseoService, private historicoServicio:HistoricoService,private router:Router) {
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerDeseos();
  }

  private obtenerProductos(){
    this.productoServicio.obtenerListaDeProductos().subscribe(dato => {
      this.productos = dato;
    });
  }

  private obtenerDeseos(){
    this.deseoServicio.obtenerListaDeDeseos().subscribe(dato => {
      this.deseos = dato;
    });
  }

  changeFormat(){
    let ChangedFormat = this.pipe.transform(this.today, 'YYYY-MM-dd HH:mm:ss');
    this.changedDate = ChangedFormat;
    console.log(this.changedDate);
  }

  obtenerProducto(id:number){
    this.producto = new Producto();
    this.productoServicio.obtenerProductoPorId(id).subscribe(dato => {
      this.producto = dato;
    });
  }

  agregarDeseo(id:number){
    this.deseo = new Deseo();
    this.historico = new Historico();

    this.productoServicio.obtenerProductoPorId(id).subscribe(dato => {
      console.log("Producto:" + dato.nombre);
      this.changeFormat();

      this.deseo.setProducto(dato);

      this.historico.setAccion("Agregar");
      this.historico.setFecha(this.changedDate);
      this.historico.setProducto(dato);

      this.deseoServicio.registrarDeseo(this.deseo).subscribe(dato => {
        //console.log(dato);
        //this.obtenerProductos();
      },error => console.log(error));

      this.historicoServicio.registrarHistorico(this.historico).subscribe(dato => {
        //console.log(dato);
        //this.obtenerProductos();
      },error => console.log(error));
    });
  }

  esDeseado(id:number):boolean{

    let deseado = false;
    for (let i = 0; i < this.deseos.length; i++) {
      const e = this.deseos[i];
      if(e.producto.id == id){
        deseado = true;
      }
    }
    return deseado;
  }

}
