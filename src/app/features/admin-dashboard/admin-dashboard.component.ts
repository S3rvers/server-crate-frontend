import { NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminLink } from '../../types';
import { Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { UserProfileImageComponent } from '../../shared/components/user-profile-image/user-profile-image.component';
import { Store } from '@ngrx/store';
import { getAttributes } from '../../store/category-management/attributes/attributes.actions';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgOptimizedImage, MatTabsModule, UserProfileImageComponent, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent implements OnInit {
  navLinks: AdminLink[] = [];
  activeLink!: AdminLink;
  settings: AdminLink = {
    label: 'Settings',
    link: 'settings',
    svg: '/assets/settings.svg'
  }
  constructor(private router: Router, private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(getAttributes());
    this.navLinks = [
      {
        label: 'Attributes',
        link: 'attributes',
        svg: '/assets/attributes.svg'
      },
      {
        label: 'Category Management',
        link: 'category-management',
        svg: '/assets/category.svg'
      },
      {
        label: 'Dashboard',
        link: 'dashboard',
        svg: '/assets/dashboard.svg',
      },
      {
        label: 'Products',
        link: 'products',
        svg: '/assets/products.svg',
      },
      {
        label: 'Orders',
        link: 'orders',
        svg: '/assets/orders.svg'
      },
      {
        label: 'Transactions',
        link: 'transactions',
        svg: '/assets/transaction.svg'
      },
      {
        label: 'Customers',
        link: 'customers',
        svg: '/assets/customer.svg'
      }
    ];
    this.activeLink = this.navLinks[0];
    if (this.router.url !== '/admin/attributes') {
      this.router.navigateByUrl('/admin/attributes');
    }
  }

  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}
