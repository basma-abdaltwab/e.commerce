import { SubcategoryComponent } from './features/subcategory/subcategory.component';

import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    title: 'FreshCart - Home',
    loadComponent: () => import('./features/home/home.component').then((c) => c.HomeComponent),
  },

  {
    path: 'search',
    title: 'FreshCart - Search',
    loadComponent: () =>
      import('./features/search/search.component').then((c) => c.SearchComponent),
  },
  {
    path: 'shop',
    title: 'FreshCart - Shop',
    loadComponent: () => import('./features/shop/shop.component').then((c) => c.ShopComponent),
  },
  {
    path: 'subcategory/:id',
    title: 'FreshCart - Subcategory',
    loadComponent: () => import('./features/subcategory/subcategory.component').then((c) => c.SubcategoryComponent),
  },
  {
    path: 'categories',
    title: 'FreshCart - Categories',
    loadComponent: () =>
      import('./features/categories/categories.component').then((c) => c.CategoriesComponent),
  },
  {
    path: 'brands',
    title: 'FreshCart - Brands',
    loadComponent: () =>
      import('./features/brands/brands.component').then((c) => c.BrandsComponent),
  },
  {
    path: 'details-brand/:id',
    title: 'FreshCart - Details',
    loadComponent: () =>
      import('./features/brands/components/details-brand/details-brand.component').then(
        (c) => c.DetailsBrandComponent,
      ),
  },

  {
    path: 'cart',
    title: 'FreshCart - Shopping Cart',
    loadComponent: () => import('./features/cart/cart.component').then((c) => c.CartComponent),
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    title: 'FreshCart - My Wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist.component').then((c) => c.WishlistComponent),
    canActivate: [authGuard],
  },
  {
    path: 'details/:slug/:id',
    title: 'FreshCart - Product Details',
    loadComponent: () =>
      import('./features/details/details.component').then((c) => c.DetailsComponent),
  },
  {
    path: 'category-details/:slug/:id',
    title: 'FreshCart - Category Details',
    loadComponent: () =>
      import('./features/category-details/category-details.component').then(
        (c) => c.CategoryDetailsComponent,
      ),
  },

  {
    path: 'checkout/:id',
    title: 'FreshCart - Checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((c) => c.CheckoutComponent),
    canActivate: [authGuard],
  },
  {
    path: 'allorders',
    title: 'FreshCart - My Orders',
    loadComponent: () =>
      import('./features/orders/orders.component').then((c) => c.OrdersComponent),
    canActivate: [authGuard],
  },
  {
    path: 'login',
    title: 'FreshCart - Login',
    loadComponent: () => import('./features/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'register',
    title: 'FreshCart - Register',
    loadComponent: () =>
      import('./features/register/register.component').then((c) => c.RegisterComponent),
  },
  {
    path: 'forgotPassword',
    title: 'FreshCart - Forgot Password',
    loadComponent: () =>
      import('./features/forgot-password/forgot-password.component').then(
        (c) => c.ForgotPasswordComponent,
      ),
  },
  {
    path: '**',
    title: 'FreshCart - Page Not Found',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then((c) => c.NotFoundComponent),
  },
];
