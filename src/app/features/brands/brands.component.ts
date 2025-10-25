import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService);

  ngOnInit(): void {
    this.getAllBrandsData
  }
  getAllBrandsData():void{
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res)
      }
    })
  }
}
