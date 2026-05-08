import { SubCategoryData } from './../../core/models/sub-category-data.interface';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Categorydetails } from '../../core/models/categorydetails.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';

@Component({
  selector: 'app-category-details',
  imports: [RouterLink],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  CategorytId: WritableSignal<string | null> = signal<string | null>(null);

  categoryDetails: WritableSignal<Categorydetails> = signal<Categorydetails>({} as Categorydetails);

  subDetails = signal<SubCategoryData[]>([]);

  ngOnInit(): void {
    this.getCategoryId();
    this.getSpcificCategoryData();
    this.getAllSubCategoriesData();
  }

  getCategoryId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParams) => {
        this.CategorytId.set(urlParams.get('id'));
      },
    });
  }

  getSpcificCategoryData(): void {
    this.categoriesService.getSpecificCategories(this.CategorytId()).subscribe({
      next: (res) => {
        this.categoryDetails.set(res.data);
      },
    });
  }

  getAllSubCategoriesData(): void {
    this.categoriesService.getAllSubCategories(this.CategorytId()).subscribe({
      next: (res) => {
        this.subDetails.set(res.data);
      },
    });
  }
}
