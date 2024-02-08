import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authGuard } from '../../core/guards/auth.guard';
import { settingsGuard } from '../../core/guards/settings.guard';
import { HomeComponent } from './home.component';
import { FeaturedProductEffect } from '../../store/product/featured-product/featured-product.effect';
import { FeaturedProductFeature } from '../../store/product/featured-product/featured-product.reducer';
import { ProductsEffect } from '../../store/admin/products/products.effects';
import { productsFeature } from '../../store/admin/products/products.reducers';
import { CategoryEffect } from '../../store/admin/products/categories.effect';
import { configurationFeature } from '../../store/admin/products/configuration.reducers';
import { categoryFeature } from '../../store/admin/products/categories.reducers';
import { Routes } from '@angular/router';
import { UserEffect } from '../../store/users/users.effects';
import { CartComponent } from '../cart/cart.component';
import { cartFeature } from '../../store/cart/cart.reducers';
import { CartEffects } from '../../store/cart/cart.effects';

export const route: Routes = [
    {
        path: '',
        children: [
            {
                path: 'settings',
                loadChildren: () => import('../account-settings/account-settings.routes').then(m => m.route),
                canActivate: [
                    settingsGuard,
                    authGuard
                ]
            },
            {
                path: '',
                loadChildren: () => import('../landing/landing.routes').then(m => m.route),
                providers: [
                    provideState(FeaturedProductFeature),
                    provideEffects(FeaturedProductEffect),
                ]
            },
            {
                path: 'servers',
                loadComponent: () => import('../preference-selection/preference-selection.component').then(m => m.PreferenceSelectionComponent),
                providers: [
                    provideEffects(ProductsEffect),
                    provideEffects(CategoryEffect),
                    provideEffects(UserEffect),
                    provideState(productsFeature),
                    provideState(categoryFeature),
                ]
            },
            {
                path: 'servers/:search',
                loadComponent: () => import('../preference-selection/preference-selection.component').then(m => m.PreferenceSelectionComponent),
                providers: [
                    provideEffects(ProductsEffect),
                    provideEffects(CategoryEffect),
                    provideState(productsFeature),
                    provideState(categoryFeature),
                ]
            },
            {
                path: 'cart',
                component: CartComponent,
                providers: [
                    provideState(cartFeature),
                    provideEffects(CartEffects)
                ]
            },
            {
                path: 'compare',
                loadComponent: () => import('../compare/compare.component').then(m => m.CompareComponent),
                // providers: [
                //     provideEffects(CategoryEffect),
                //     provideState(configurationFeature)
                // ]
            }
        ],
        component: HomeComponent
    },
]