import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { ProductDetails } from '../../core/models/product-details.interface';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { ProductsData } from '../../core/models/products-data.interface';
import { ReviewsComponent } from "./components/reviews/reviews.component";


@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, RouterLink, PercentPipe, ReviewsComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);

  productId: WritableSignal<string | null> = signal<string | null>(null);
  productList: WritableSignal<ProductsData[]> = signal<ProductsData[]>([]);

  productDetails: WritableSignal<ProductDetails> = signal<ProductDetails>({} as ProductDetails);

  ngOnInit(): void {
    this.getProductId();
    this.getSpecificProductData();
    this.getAllProductsData();
  }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
         this.productId.set(urlParams.get('id'))
      },
    });
  }

  

  getAllProductsData(): void {
    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        this.productList.set(res.data);
      },
    });
  }

  getSpecificProductData(): void {
    this.productsService.getSpecificProducts(this.productId()).subscribe({
      next: (response) => {
        this.productDetails.set(response.data);

        
      },
    });
  }

  changeImage(img: string): void {
    this.productDetails.update((current) => ({
      ...current,
      imageCover: img,
    }));
  }
}
