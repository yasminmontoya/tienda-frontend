import { ProductoService } from './../../services/producto.service';
import { Producto } from './../../models/producto';
import { Component, OnInit } from '@angular/core';
import { DeseoService } from 'src/app/services/deseo.service';
import { Deseo } from 'src/app/models/deseo';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HistoricoService } from 'src/app/services/historico.service';
import { Historico } from 'src/app/models/historico';
import swal from 'sweetalert2';

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
  deseos:Deseo[];
  historico:Historico;

  constructor(private productoServicio:ProductoService, private deseoServicio:DeseoService, private historicoServicio:HistoricoService,private router:Router) {
  }

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerDeseos();
  }

  private obtenerProductos(){
    this.productoServicio.obtenerListaDeProductos().subscribe(dato => {
      this.productos = dato;
    });
  }

  private obtenerDeseos(){
    this.deseoServicio.obtenerListaDeDeseos().subscribe(dato => {
      this.deseos = dato;
    });
  }

  changeFormat(){
    let ChangedFormat = this.pipe.transform(this.today, 'YYYY-MM-dd HH:mm:ss');
    this.changedDate = ChangedFormat;
  }

  agregarDeseo(id:number){
    this.deseo = new Deseo();
    this.historico = new Historico();
    swal({
      title: '¿Estás seguro?',
      text: "Confirma si deseas agregar el producto a la lista de deseos",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, agregarlo',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: true
    }).then((result) => {
      if(result.value){
        this.productoServicio.obtenerProductoPorId(id).subscribe(dato => {
          this.changeFormat();
          this.deseo.setProducto(dato);
          this.historico.setAccion("Agregar");
          this.historico.setFecha(this.changedDate);
          this.historico.setProducto(dato);
          this.historicoServicio.registrarHistorico(this.historico).subscribe();
          this.deseoServicio.registrarDeseo(this.deseo).subscribe();
          swal(
            'Producto Agregado',
            'El producto ha sido agregado con exito',
            'success'
          )
          //this.router.navigate(['/deseos']);
          //window.location.reload();
          setTimeout(() =>
          {
            window.location.reload();
          },
          1000);
        });
      }
    });
  }

  esDeseado(id:number):boolean{
    let deseado = false;
    for (let i = 0; i < this.deseos.length; i++) {
      const e = this.deseos[i];
      if(e.producto.id == id){
        deseado = true;
      }
    }
    return deseado;
  }

}
