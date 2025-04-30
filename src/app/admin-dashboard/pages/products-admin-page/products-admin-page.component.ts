import { Component, input } from '@angular/core';
import { Product } from '../../../products/interfaces/product.interface';
import { ProductTableComponent } from "../../../products/components/product-table/product-table.component";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {

  products = input.required<Product[]>();
}
