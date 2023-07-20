import { DeseoService } from './../../services/deseo.service';
import { Deseo } from './../../models/deseo';
import { Component, OnInit } from '@angular/core';
import { HistoricoService } from 'src/app/services/historico.service';
import { ProductoService } from 'src/app/services/producto.service';
import { DatePipe } from '@angular/common';
import { Historico } from 'src/app/models/historico';
import swal from 'sweetalert2';

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
      this.productoSinStock();
    });
  }

  changeFormat(){
    let ChangedFormat = this.pipe.transform(this.today, 'YYYY-MM-dd HH:mm:ss');
    this.changedDate = ChangedFormat;
    console.log(this.changedDate);
  }

  eliminarDeseo(idDeseo:number, idProducto:number){
    this.historico = new Historico();
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas eliminar el producto de la lista de deseos",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, elimínalo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.productoServicio.obtenerProductoPorId(idProducto).subscribe(dato => {
          this.changeFormat();
          this.historico.setAccion("Eliminar");
          this.historico.setFecha(this.changedDate);
          this.historico.setProducto(dato);
          this.historicoServicio.registrarHistorico(this.historico).subscribe();
          this.deseoServicio.eliminarDeseo(idDeseo).subscribe(dato => {
            this.obtenerDeseos();
          });
          swal(
            'Producto eliminado',
            'El producto ha sido eliminado con exito de la lista de deseos',
            'success'
          )
        });
      }
    });
  }

  productoSinStock(){
    let cantidad = 0;
    for (let i = 0; i < this.deseos.length; i++) {
      const e = this.deseos[i];
      if(e.producto.cantidad == 0){
        cantidad ++;
      }
    }
    if(cantidad > 0 ){
      swal(
        'Producto sin stock',
        'Actualmente ' + cantidad +  ' de sus productos se encuentran sin stock',
        'warning'
      )
    }
  }
}
