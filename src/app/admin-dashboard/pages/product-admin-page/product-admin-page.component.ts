import { Component, effect, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-product-admin-page',
  imports: [],
  templateUrl: './product-admin-page.component.html',
})
export class ProductAdminPageComponent {

  activateRoute = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService)

  productId = toSignal(
    this.activateRoute.params.pipe(
      map(params => params['id'])
    )
  );

  productResource = rxResource({
    request: () => ({ id: this.productId()}),
    loader:({request}) => {
      return this.productService.getProductById(request.id);

    },
  });

  redirectEffect = effect(() => {
    if( this.productResource.error()){
      this.router.navigate(['/admin/products']);
    }
  });
}
