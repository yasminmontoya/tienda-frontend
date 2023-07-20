import { Producto } from "./producto";

export class Deseo {

  id:number;
  producto: Producto;

  setProducto(producto:Producto){
    this.producto = producto;
  }

}
