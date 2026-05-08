import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { CategoryData } from '../../../../core/models/category-data.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-popular-categories',
  imports: [RouterLink],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent {
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
