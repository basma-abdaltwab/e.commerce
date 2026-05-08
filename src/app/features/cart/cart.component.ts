
import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CartData } from '../../core/models/cart-data.interface';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly platform = inject(PLATFORM_ID);
  private readonly toastrService = inject(ToastrService);

  cartDetails: WritableSignal<CartData> = signal<CartData>({} as CartData);
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platform)) {
      const token = localStorage.getItem('freshToken');
      if (token) {
        this.getCartData();
      }
    }
  }

  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart App', {
            progressBar: true, 
            closeButton: true, 
            timeOut:2500,
          })
          this.cartDetails.set(res.data);
        }
      },
    });
  }

  removeItemFromCart(id: string): void {
    this.cartService.removeProductFromCart(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'FreshCart App', {
            progressBar: true,
            closeButton: true,
            timeOut: 2000,
            toastClass: 'ngx-toastr delete-toast', 
          });
          this.cartDetails.set(res.data);
          this.cartService.cartcount.set(res.numOfCartItems);
        }
      },
    });
  }

  updateProductQuantity(id:string , count:number): void{
    this.cartService.updateCartProductQuantity(id, count).subscribe({
      next: (res) => {
       if (res.status === 'success') {
         this.toastrService.success(res.message, 'FreshCart App', {
           progressBar: true,
           closeButton: true,
           timeOut: 2000,
         });
         this.cartDetails.set(res.data);
         this.cartService.cartcount.set(res.numOfCartItems);
       }
      }
    })
  }


  clearCartFromItem(): void{
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
       if (res.status === 'success') {
         this.toastrService.success(res.message, 'FreshCart App', {
           progressBar: true,
           closeButton: true,
           timeOut: 2000,
         });
         this.cartDetails.set(res.data);
         this.cartService.cartcount.set(res.numOfCartItems);
       }
        
      }
    })
  }
}
