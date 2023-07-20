import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Historico } from '../models/historico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistoricoService {

  //Esta URL obtiene el listado de el historico en el backend
  private baseURL = "http://localhost:8080/api/v1/historico";

  constructor(private httpClient : HttpClient) { }

      //este metodo nos sirve para obtener el historico
      obtenerHistorico():Observable<Historico[]>{
        return this.httpClient.get<Historico[]>(`${this.baseURL}`);
      }

      //este metodo nos sirve para registrar un historico
      registrarHistorico(historico:Historico) : Observable<Object>{
        return this.httpClient.post(`${this.baseURL}`,historico);
      }
}
