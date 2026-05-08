import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';
import { CartData, CartDataResponse } from '../../core/models/cart-data.interface';
import { ProductsData } from '../../core/models/products-data.interface';
import { WishlistDetails } from '../../core/models/wishlist-details.interface';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly platform = inject(PLATFORM_ID);

  wishList: WritableSignal<WishlistDetails[]> = signal<WishlistDetails[]>([]);
  productList: WritableSignal<ProductsData[]> = signal<ProductsData[]>([]);
  addedToCartIds = signal<string[]>([]);

  

  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        this.getWishlistData();
      }
    }
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'WishList App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2000,
          });
          this.addedToCartIds.update((ids) => [...ids, id]);
        }
      },
    });
  }

  getWishlistData(): void {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.status, 'FreshCart App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2000,
          });
          this.wishList.set(res.data);
        }
      },
    });
  }

  removeItemFromWishlist(id: string): void {
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success('Product removed successfully', 'FreshCart App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2000,
          });
          this.wishList.set(res.data);
        }
      },
    });
  }
}
