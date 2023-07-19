import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from './../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

    //Esta URL obtiene el listado de todos los productos en el backend
    private baseURL = "http://localhost:8080/api/v1/productos";

    constructor(private httpClient : HttpClient) { }

    //este metodo nos sirve para obtener los productos
    obtenerListaDeProductos():Observable<Producto[]>{
      return this.httpClient.get<Producto[]>(`${this.baseURL}`);
    }
}
