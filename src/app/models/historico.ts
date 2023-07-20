import { Producto } from "./producto";

export class Historico {

  id:number;
  fecha:string;
  accion:string;
  producto: Producto;

  setAccion(accion:string){
    this.accion = accion;
  }

  setFecha(fecha:string){
    this.fecha = fecha;
  }

  setProducto(producto:Producto){
    this.producto = producto;
  }

}
