import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { AllCategories } from '../../core/models/allCategories/all-categories.interface';
import { RouterLink } from '@angular/router';
import { SubCategoriesService } from '../../core/services/subCategories/sub-categories.service';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  private readonly categoriesService = inject(CategoriesService);
  private readonly subCategoriesService = inject(SubCategoriesService);
  allCategories:WritableSignal<AllCategories| null > = signal(null)
  

  ngOnInit(): void {
    this.getAllCategories()
  }

                      // Categories 
  getAllCategories():void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.allCategories.set(res)
        console.log(res);
      }
    })
  }


}
