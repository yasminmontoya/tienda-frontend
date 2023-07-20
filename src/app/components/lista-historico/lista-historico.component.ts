import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Historico } from 'src/app/models/historico';
import { HistoricoService } from 'src/app/services/historico.service';

@Component({
  selector: 'app-lista-historico',
  templateUrl: './lista-historico.component.html',
  styleUrls: ['./lista-historico.component.css']
})
export class ListaHistoricoComponent implements OnInit {

  historicos:Historico[];

  constructor(private historicoServicio:HistoricoService,private router:Router) {
  }

  ngOnInit(): void {
    this.obtenerHistorico();
  }

  private obtenerHistorico(){
    this.historicoServicio.obtenerHistorico().subscribe(dato => {
      this.historicos = dato;
    });
  }
}
