import { Producto } from "./producto";

export class Deseo {

  id:number;
  fecha:string;
  producto: Producto;

  Deseo (fecha:string, producto: Producto){
    this.fecha = fecha;
    this.producto = producto;
  }

  setFecha(fecha:string){
    this.fecha=fecha;
  }

  setProducto(producto:Producto){
    this.producto = producto;
  }

}
