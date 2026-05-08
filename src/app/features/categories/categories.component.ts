import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { SubCategoriesService } from '../../core/services/SubCategories/sub-categories.service';
import { SubCategoryData } from '../../core/models/sub-category-data.interface';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { CategoryData } from '../../core/models/category-data.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit{


  // private readonly subCategoriesService = inject(SubCategoriesService);

  // subcategoryList: WritableSignal<SubCategoryData[]> = signal<SubCategoryData[]>([]);

  // ngOnInit(): void {
  //   this.getAllSubCategoiesData()
  // }

  // getAllSubCategoiesData(): void{
  //   this.subCategoriesService.getAllSubCategories().subscribe({
  //     next:(res) => {
  //      this.subcategoryList.set(res.data)
  //     }
  //   })
  // }

  
private readonly categoriesService = inject(CategoriesService);

  categoryList: WritableSignal<CategoryData[]> = signal<CategoryData[]>([]);

  ngOnInit(): void {
    this.getAllCategoriesData();
  }

  getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList.set(res.data);
      },
    });
  }

}
