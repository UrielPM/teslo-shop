import { Component, inject, input, signal } from '@angular/core';
import { ProductTableComponent } from '../../../products/components/product-table/product-table.component';
import { ProductService } from '../../../products/services/product.service';
import { PaginationService } from '../../../shared/components/pagination/pagination.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductTableComponent, PaginationComponent],
  templateUrl: './products-admin-page.component.html',
})
export class ProductsAdminPageComponent {
  ProductService = inject(ProductService);
  paginationServices = inject(PaginationService);

  productsPerPage = signal(10);

  productResource = rxResource({
    request: () => ({ page: this.paginationServices.currentPage() - 1,
      limit: this.productsPerPage()
     }),
    loader: ({ request }) => {
      return this.ProductService.getProduct({
        offset: request.page * 8,
        limit: request.limit
      });
    },
  });
}
