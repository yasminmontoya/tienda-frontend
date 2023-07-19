import { Component, HostBinding, Input } from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  @Input() producto: Producto;
  @HostBinding('attr.class') cssClass='col-md-3 pb-4';
}
