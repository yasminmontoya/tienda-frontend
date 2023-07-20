import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { DeseoService } from 'src/app/services/deseo.service';
import { Deseo } from 'src/app/models/deseo';
import { DatePipe } from '@angular/common';

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

  constructor(private productoServicio:ProductoService, private deseoServicio:DeseoService) {
  }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  private obtenerProductos(){
    this.productoServicio.obtenerListaDeProductos().subscribe(dato => {
      this.productos = dato;
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

    this.productoServicio.obtenerProductoPorId(id).subscribe(dato => {
      this.changeFormat();
      this.deseo.setFecha(this.changedDate);
      this.deseo.setProducto(dato);

      this.deseoServicio.registrarDeseo(this.deseo).subscribe(dato => {
        console.log(dato);
        this.obtenerProductos();
      },error => console.log(error));

    });

  }

}
