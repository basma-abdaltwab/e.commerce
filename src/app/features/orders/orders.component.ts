import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { PaymentService } from '../../core/services/payment/payment.service';
import { OrderData } from '../../core/models/order-data.interface';


@Component({
  selector: 'app-orders',
  imports: [RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly paymentService = inject(PaymentService);
  private readonly platform = inject(PLATFORM_ID);

  userId: WritableSignal<string | null> = signal<string | null>(null)
  orderList:WritableSignal<OrderData[]>=signal<OrderData[]>([])



  ngOnInit(): void {
    this.getUserId();
    this.getUserOrderData();
  }

  getUserId(): void {

    if (isPlatformBrowser(this.platform)) {

      const token = localStorage.getItem('freshToken')
      if (token) {
        this.userId.set(JSON.parse(localStorage.getItem('userData')!).id);
      }
    }
  }

  getUserOrderData(): void {
    this.paymentService.createUserOrders(this.userId()).subscribe({
      next: (res) => {
       
       this.orderList.set(res.data)
      }
    })
  }
}
