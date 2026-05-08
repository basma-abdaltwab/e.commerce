import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductsData } from '../../core/models/products-data.interface';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import {NgxPaginationModule, PaginationInstance} from 'ngx-pagination'; // <-- import the module

@Component({
  selector: 'app-shop',
  imports: [CurrencyPipe, RouterLink, PercentPipe, NgxPaginationModule],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css',
})
export class ShopComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  productList: WritableSignal<ProductsData[]> = signal<ProductsData[]>([]);

  pagination: PaginationInstance = {
    id: 'foo',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 0,
  };

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(): void {
    this.productsService
      .getAllProduct(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.productList.set(res.data);
          this.pagination.totalItems = res.results;
        },
      });
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
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

  pageChanged(page: number): void {
    this.pagination.currentPage = page;
    this.getAllProductsData();
  }
}
