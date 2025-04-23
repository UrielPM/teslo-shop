import { Component, inject, signal } from '@angular/core';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { ProductService } from '../../../products/services/product.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-home-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

ProductService = inject(ProductService);

activateRoute = inject(ActivatedRoute);

currentPage = toSignal(
  this.activateRoute.queryParamMap.pipe(
    map( params => (params.get('page') ? +params.get('page') ! : 1)),
    map((page) => (isNaN(page) ? 1 : page))

  ),
  {
    initialValue: 1,
  }
);

productResource = rxResource({
  request: () => ({ page: this.currentPage() - 1}),
  loader:({ request}) => {
    return this.ProductService.getProduct({
      offset: request.page * 8

    });
  },
});


}
