import { Component } from '@angular/core';
import { ProductDisplayDatatableComponent } from "./product-display-datatable/product-display-datatable.component";

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [
    ProductDisplayDatatableComponent
  ],
  templateUrl: './product-display.component.html',
  styleUrl: './product-display.component.scss'
})
export class ProductDisplayComponent {

}
