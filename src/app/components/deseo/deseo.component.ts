import { Component, HostBinding, Input } from '@angular/core';
import { Deseo } from 'src/app/models/deseo';

@Component({
  selector: 'app-deseo',
  templateUrl: './deseo.component.html',
  styleUrls: ['./deseo.component.css']
})
export class DeseoComponent {

  @Input() deseo: Deseo;
  @HostBinding('attr.class') cssClass='col-md-3 pb-4';
}
