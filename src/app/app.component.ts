import { Component } from '@angular/core';
import { ProductDisplayComponent } from "./features/product-display/product-display.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductDisplayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'invoice-viewer';
}
