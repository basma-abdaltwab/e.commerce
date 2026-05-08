import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandService } from '../../core/services/brands/brand.service';
import { BrandData } from '../../core/models/brand-data.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandService = inject(BrandService);

  brandList:WritableSignal<BrandData[]>=signal<BrandData[]>([])

  ngOnInit(): void {
    this.getAllBrandsData();
  }

  getAllBrandsData(): void {
    this.brandService.getAllbrands().subscribe({
      next: (res) => {
       this.brandList.set(res.data)
      }
    })
  }
}
