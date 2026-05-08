import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { ReviewsDetails } from '../../../../core/models/reviews-details.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-reviews',
  imports: [DecimalPipe],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  productId: WritableSignal<string | null> = signal<string | null>(null);
  reviewDetails: WritableSignal<ReviewsDetails[]> = signal<ReviewsDetails[]>([]);

  ngOnInit(): void {
    this.getReviewId();
    this.getReviewsData();
  }

  getReviewId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.productId.set(urlParams.get('id'));
      },
    });
  }

  getReviewsData(): void {
    this.productsService.getReviewProduct(this.productId()).subscribe({
      next: (res) => {
        this.reviewDetails.set(res.data);
      },
    });
  }

  calculatePercentage(star: number): number {
    const reviews = this.reviewDetails();
    if (reviews.length === 0) return 0;

    const count = reviews.filter((rev) => Math.round(rev.rating) === star).length;

    return (count / reviews.length) * 100;
  }
  
}
