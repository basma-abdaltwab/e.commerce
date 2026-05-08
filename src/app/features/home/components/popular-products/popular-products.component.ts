import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductsData } from '../../../../core/models/products-data.interface';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-popular-products',
  imports: [CurrencyPipe, RouterLink, PercentPipe],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  productList: WritableSignal<ProductsData[]> = signal<ProductsData[]>([]);

  isLoading = signal<string | null>(null);
  
  successItemId: string | null = null;

  

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(): void {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList.set(res.data);
      },
    });
  }

  addProductItemToCart(id: string): void {
    this.isLoading.set(id);

    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.isLoading.set(null);
        // Spinner
        if (res.status === 'success') {
          this.successItemId = id;

          setTimeout(() => {
            this.successItemId = null;
          }, 1000);

          this.toastrService.success(res.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
            timeOut: 2000,
          });
          this.cartService.cartcount.set(res.numOfCartItems);
          
        }
      },
    });
  }

  addProductItemToWishlist(id: string): void {
    this.wishlistService.addProductToWishlist(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
            timeOut: 2000,
          });
        }
         this.wishlistService.wishCount.set(res.data.length)
        
      },
    });
  }
}
