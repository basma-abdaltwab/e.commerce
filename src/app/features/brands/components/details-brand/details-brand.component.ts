import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../../../../core/services/brands/brand.service';
import { ProductsService } from '../../../../core/services/products/products.service';
import { ProductDetails } from './../../../../core/models/product-details.interface';
import { BrandDetails, BrandDetailsResponse } from '../../../../core/models/brand-details.interface';


@Component({
  selector: 'app-details-brand',
  imports: [],
  templateUrl: './details-brand.component.html',
  styleUrl: './details-brand.component.css',
})
export class DetailsBrandComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly brandService = inject(BrandService);
  private readonly productsService = inject(ProductsService);

  brandId: WritableSignal<string | null> = signal<string | null>(null);

  produts: WritableSignal<ProductDetails[]> = signal<ProductDetails[]>([]);
  
  brandDetails: WritableSignal<BrandDetails> = signal<BrandDetails>({} as BrandDetails);

  ngOnInit(): void {
    
    this.getBrandId();
    
    this.getSpecificBrandData();
    
    this.getDetailsBrand(this.brandId()!);
  }

  getBrandId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.brandId.set(urlParams.get('id'));
      },
    });
  }

  getSpecificBrandData():void {
    this.brandService.getAllSpecificBrand(this.brandId()).subscribe({
      next: (res) => {
        this.brandDetails.set(res.data);
      },
    });
  }

  getDetailsBrand(brandId:string): void {
    this.productsService.getProductsByBrand(brandId).subscribe({
      next: (res) => {
        console.log(res.data);
        this.produts.set(res.data);
      }
    })
  }
}
