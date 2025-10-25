import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecificCategoryService } from './services/specific-category.service';
import { SpecificCategory } from './models/specificCategory/specific-category.interface';

@Component({
  selector: 'app-category-details',
  imports: [],
  templateUrl: './category-details.component.html',
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {
  private readonly specificCategoryService = inject(SpecificCategoryService);
  private readonly activatedRoute = inject(ActivatedRoute);
  id:WritableSignal<string | null> = signal(null)
  categoryDetails:WritableSignal<SpecificCategory | null > = signal(null)



  ngOnInit(): void {
    this.getParams();
    this.getSpecificCategoryData();
  }
  getSpecificCategoryData():void{
    this.specificCategoryService.getSpecificCategory(this.id()).subscribe({
      next:(res)=>{
        this.categoryDetails.set(res.data);
      }
    })
  } 

  getParams(): void {
  this.activatedRoute.paramMap.subscribe({
    next: (urlParams) => {
      this.id.set(urlParams.get('id'))
    }
  });
}

}
