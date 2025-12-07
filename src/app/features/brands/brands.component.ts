import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { Brands, Daum } from './models/brands.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  private readonly brandsService = inject(BrandsService);
  allBrands:WritableSignal<Daum[]> = signal([]);

  ngOnInit(): void {
    this.getAllBrandsData()
  }
  getAllBrandsData():void{
    this.brandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res)
        this.allBrands.set(res.data)
      }
    })
  }
}
