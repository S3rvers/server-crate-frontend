import { createAction, props } from "@ngrx/store";
import { ProductItem } from "../../../types";

export const loadFeaturedProducts = createAction('[featuredProducts Component] get all featured products')
export const loadFeaturedProductsSuccess = createAction('[featuredProducts Component] get all featured products', props<{ featuredProducts: ProductItem[]}>())
export const loadFeaturedProductsFailure = createAction('[featuredProducts Component] get all featured products', props<{ error: any }>())