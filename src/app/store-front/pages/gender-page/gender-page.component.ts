import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProductService } from '../../../products/services/product.service';
import { ProductCardComponent } from "../../../products/components/product-card/product-card.component";
import { PaginationComponent } from "../../../shared/components/pagination/pagination.component";
import { PaginationService } from '../../../shared/components/pagination/pagination.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCardComponent, PaginationComponent],
  templateUrl: './gender-page.component.html',
})
export class GenderPageComponent {

route = inject(ActivatedRoute);
ProductService = inject(ProductService);
paginationServices = inject(PaginationService);

gender = toSignal(this.route.params.pipe(map(({ gender }) => gender)));

  productResource = rxResource({
    request: () => ({ gender: this.gender(), page: this.paginationServices.currentPage() -  1 }),
    loader:({ request}) => {
      return this.ProductService.getProduct({
        gender: request.gender,
        offset: request.page * 8
      });
    },
  });

}
