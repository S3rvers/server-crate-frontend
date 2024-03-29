import { Component } from '@angular/core';
import { ProductItem } from '../../../../types';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from '../../../../shared/components/product-item/product-item.component';
import { Store } from '@ngrx/store';
import { selectFeaturedProducts, selectLoading } from '../../../../store/product/featured-product/featured-product.reducer';
import { loadFeaturedProducts } from '../../../../store/product/featured-product/featured-product.action';
import { Observable } from 'rxjs';
import { HomepageProductItemComponent } from '../../../../shared/components/homepage-product-item/homepage-product-item.component';
import { Router } from '@angular/router';
import { UserProductItemComponent } from '../../../../shared/components/user-product-item/user-product-item.component';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [CommonModule, HomepageProductItemComponent, UserProductItemComponent],
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent {

  featuredProducts$!: Observable<ProductItem[] | []>;
  loading$!: Observable<boolean>;

    ngOnInit() {
      this.featuredProducts$ = this.store.select(selectFeaturedProducts);
      this.loading$ = this.store.select(selectLoading);

      this.store.dispatch(loadFeaturedProducts());
    }

    navigateToProduct = () => {
      this.router.navigate(['/servers'], { replaceUrl: true })
    }

  constructor(private store: Store, private router: Router) {}

}
