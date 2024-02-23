import { CommonModule } from '@angular/common'
import { Component, Input } from '@angular/core'
import { Store } from '@ngrx/store';
import { getBrands, getCases, getUserCategories } from '../../../../store/admin/products/categories.actions';
import { selectCategoriesState } from '../../../../store/admin/products/categories.reducers';
import { Select } from '../../../../types';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mega-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mega-menu.component.html',
})
export class MegaMenuComponent {
  @Input() isMenuOpen!: boolean

  CATEGORY_OPTION = 'categories'
  CASE_OPTION = 'case'
  BRAND_OPTION = 'brand'

  initCategory: Select = { id: "1", name: "category", description: "description", thumbnail: "/assets/hero1.jpg" }
  initCase: Select = { id: "2", name: "cases", description: "description", thumbnail: "/assets/hero2.jpg" }
  initBrand: Select = { id: "3", name: "brand", description: "description", thumbnail: "/assets/hero2.jpg" }

  initOption: Record<string, Select> = {
    [this.CATEGORY_OPTION]: this.initCategory,
    [this.CASE_OPTION]: this.initCase,
    [this.BRAND_OPTION]: this.initBrand
  }

  defaultMenu: Select = this.initCategory
  activeMenu: string = this.CATEGORY_OPTION

  productOptions: Record<string, Select[]> = {
    [this.CATEGORY_OPTION]: [],
    [this.CASE_OPTION]: [],
    [this.BRAND_OPTION]: []
  }

  ngOnInit() {
    this.store.dispatch(getUserCategories())
    this.store.dispatch(getCases())
    this.store.dispatch(getBrands())

    this.store.select(selectCategoriesState).subscribe(state => {
      this.productOptions[this.CASE_OPTION] = state.cases
      this.productOptions[this.CATEGORY_OPTION] = state.categories
      this.productOptions[this.BRAND_OPTION] = state.brands
    })

  }

  getProductOptionKeys(): string[] {
    return Object.keys(this.productOptions);
  }


  onMenuOptionSelect(active: string) {
    this.activeMenu = active
    this.onHoverMenuOption(this.initOption[this.activeMenu])
  }

  onHoverMenuOption(menu: Select, activeMenu: string | null = null) {
    if (!activeMenu) this.defaultMenu = menu
    else this.defaultMenu = this.initOption[activeMenu]

  }

  navigateToProductByFilter(product: Select, activeMenu: string) {
    this.router.navigate(['/servers'], { replaceUrl: true, queryParams: { [this.refineActiveMenuFilter(activeMenu)]: `${product?.name}` } })
    this.closeMenu()
  }

  navigateToProductServers() {
    this.router.navigate(['servers'], { replaceUrl: true })
    this.closeMenu()
  }

  closeMenu() {
    this.isMenuOpen = false;
  }


  refineActiveMenuFilter(activeMenu: string): string {
    let activeFilter = activeMenu.toLowerCase()
    if (activeFilter === "case")
      return 'productCase'

    return activeFilter
  }

  getMenuOptionsName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  constructor(private store: Store, private router: Router) { }
}