import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducer } from './store/loader/reducers/loader.reducers';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import * as Cart from './store/cart/cart.reducers';
import { CartEffects } from './store/cart/cart.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore(),
    provideState('loader', reducer),
    provideState('cart', Cart.reducer),
    provideEffects(CartEffects),
    provideEffects(),
    provideHttpClient(withInterceptors([loadingInterceptor, authInterceptor])),
    // provideCloudinaryLoader('http://res.cloudinary.com/dqtxt1g06/image/upload/'),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { disableClose: true } },
  ],
};
