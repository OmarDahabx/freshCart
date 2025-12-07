import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../brands/services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { SpecificBrand } from './models/specific-brand.interface';

@Component({
  selector: 'app-specific-brand',
  imports: [],
  templateUrl: './specific-brand.component.html',
  styleUrl: './specific-brand.component.css'
})
export class SpecificBrandComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  id:WritableSignal< string | null > = signal(null);
  brandData:WritableSignal<SpecificBrand | null > = signal({} as SpecificBrand) 

  ngOnInit(): void {
    this.getParams()
    this.getSpecificBrandData();
  }

  getParams():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParam)=>{
        this.id.set(urlParam.get('id'));
      }
    })
  }
  getSpecificBrandData():void{
    this.brandsService.getSpecificBrand(this.id()).subscribe({
    next:(res)=>{
      console.log(res);
      this.brandData.set(res.data);
    }
    })
  }
}
