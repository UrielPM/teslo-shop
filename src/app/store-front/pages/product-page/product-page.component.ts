import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../products/services/product.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product-page',
  imports: [],
  templateUrl: './product-page.component.html',
})
export class ProductPageComponent {

 activatedRoute =inject(ActivatedRoute);
 productService = inject(ProductService);

 productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

 productResource = rxResource({
    request: () => ({ idSlug: this.productIdSlug}),
    loader: ({ request }) =>  this.productService.getProductByIdSlug(request.idSlug)

 });
}
