import { DeseoService } from './../../services/deseo.service';
import { Deseo } from './../../models/deseo';
import { Component, OnInit } from '@angular/core';
import { HistoricoService } from 'src/app/services/historico.service';
import { ProductoService } from 'src/app/services/producto.service';
import { DatePipe } from '@angular/common';
import { Historico } from 'src/app/models/historico';

@Component({
  selector: 'app-lista-deseos',
  templateUrl: './lista-deseos.component.html',
  styleUrls: ['./lista-deseos.component.css']
})
export class ListaDeseosComponent implements OnInit {

  deseos:Deseo[];
  today = new Date();
  changedDate:any;
  pipe = new DatePipe('en-US');
  historico:Historico;

  constructor(private productoServicio:ProductoService, private deseoServicio:DeseoService, private historicoServicio:HistoricoService) { }

  ngOnInit(): void {
    this.obtenerDeseos();
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

  eliminarDeseo(idDeseo:number, idProducto:number){
    this.historico = new Historico();

    this.productoServicio.obtenerProductoPorId(idProducto).subscribe(dato => {

      console.log("producto" + dato)
      this.changeFormat();

      this.historico.setAccion("Eliminar");
      this.historico.setFecha(this.changedDate);
      this.historico.setProducto(dato);

      this.historicoServicio.registrarHistorico(this.historico).subscribe(dato => {
        console.log(dato);
      },error => console.log(error));

      this.deseoServicio.eliminarDeseo(idDeseo).subscribe(dato => {
        this.obtenerDeseos();
      });

    });

    return false;
  }

}
