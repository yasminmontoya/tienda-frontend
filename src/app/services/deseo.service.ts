import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deseo } from './../models/deseo';

@Injectable({
  providedIn: 'root'
})
export class DeseoService {

      //Esta URL obtiene el listado de todos los deseos en el backend
      private baseURL = "http://localhost:8080/api/v1/deseos";

      constructor(private httpClient : HttpClient) { }

      //este metodo nos sirve para obtener los deseos
      obtenerListaDeDeseos():Observable<Deseo[]>{
        return this.httpClient.get<Deseo[]>(`${this.baseURL}`);
      }

      //este metodo nos sirve para registrar un deseo
      registrarDeseo(deseo:Deseo) : Observable<Object>{
        return this.httpClient.post(`${this.baseURL}`,deseo);
      }

      //este metodo nos sirve para eliminar un deseo
      eliminarDeseo(id:number): Observable<Object>{
        return this.httpClient.delete(`${this.baseURL}/${id}`);
      }
}
