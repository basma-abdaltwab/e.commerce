import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Component, inject, Input, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsData } from '../../core/models/products-data.interface';
import { SubCategoryData } from '../../core/models/sub-category-data.interface';
import { Subcategories } from '../../core/models/subcategories.interface';
import { ProductsService } from '../../core/services/products/products.service';
import { SubCategoriesService } from '../../core/services/SubCategories/sub-categories.service';
import { PopularProductsComponent } from './../home/components/popular-products/popular-products.component';


@Component({
  selector: 'app-subcategory',
  imports: [RouterLink, PercentPipe, CurrencyPipe, ],
  templateUrl: './subcategory.component.html',
  styleUrl: './subcategory.component.css',
})
export class SubcategoryComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly subCategoriesService = inject(SubCategoriesService);
  private readonly productsService = inject(ProductsService);

  subcategoryId: WritableSignal<string | null> = signal<string | null>(null);

  SubCategDetails: WritableSignal<Subcategories> = signal<Subcategories>({} as Subcategories);

  productList: WritableSignal<ProductsData[]> = signal<ProductsData[]>([]);

  subDetails = signal<SubCategoryData[]>([]);
 

  ngOnInit(): void {
    this.getSubId();
    this.getSpecificData();
  }

  getSubId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (UrlParams) => {
        this.subcategoryId.set(UrlParams.get('id'));
      },
    });
  }

  getSpecificData(): void {
    this.subCategoriesService.getAllSpecificCategories(this.subcategoryId()).subscribe({
      next: (res) => {
        this.SubCategDetails.set(res.data);
      },
    });

    this.productsService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res.data);
        
      }
    });
  }
}
