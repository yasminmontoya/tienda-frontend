import { DeseoService } from './../../services/deseo.service';
import { Deseo } from './../../models/deseo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})
export class ListaDeseosComponent implements OnInit {

  deseos:Deseo[];

  constructor(private deseoServicio:DeseoService) { }

  ngOnInit(): void {
    this.obtenerDeseos();
  }

  private obtenerDeseos(){
    this.deseoServicio.obtenerListaDeDeseos().subscribe(dato => {
      this.deseos = dato;
    });
  }

  eliminarDeseo(id:number){
    this.deseoServicio.eliminarDeseo(id).subscribe(dato => {
      this.obtenerDeseos();
    });
  }

}
