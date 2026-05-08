import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PaymentService } from '../../core/services/payment/payment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  private readonly paymentService = inject(PaymentService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);

  cartId: WritableSignal<string | null> = signal<string | null>(null);

  ngOnInit(): void {
    this.getCartId();
  }

  flag: WritableSignal<string> = signal<string>('cash');

  getCartId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.cartId.set(urlParams.get('id'));
      },
    });
  }

  checkoutForm: FormGroup = this.fb.group({
    shippingAddress: this.fb.group({
      details: ['', [Validators.required]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/)],
      ],
      city: ['', [Validators.required]],
    }),
  });

  changedPaymentMethod(el: HTMLInputElement): void {
    this.flag.set(el.value);
  }

  submitCheckoutForm(): void {
    if (this.checkoutForm.valid) {
      if (this.flag() === 'cash') {
        this.paymentService.createCashOrder(this.cartId(), this.checkoutForm.value).subscribe({

          next: (res) => {
           if (res.status == 'success') {
             this.router.navigate(['/allorders']);
           }
          },
        });
      } else if (this.flag() === 'visa') {
        this.paymentService.createViseOrder(this.cartId(), this.checkoutForm.value).subscribe({
          next: (res) => {
           if (res.status == 'success') {
             window.open(res.session.url, '_self');
           }
          },
        });
      }
    }
  }
}
