import { Component, input } from '@angular/core';
import { ProductImagePipe } from '../../pipes/product-image.pipe';
import { Product } from '../../interfaces/product.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'product-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './product-table.component.html',
})
export class ProductTableComponent {

  products = input.required<Product[]>();

}
