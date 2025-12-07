import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Icategory } from '../../../../core/models/categories/iCategory-interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule ],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {

  private readonly categoriesService = inject(CategoriesService) ;
  categoriesList:WritableSignal<Icategory[]> = signal([])

// ---------------------------------------------------
  categoriesOptions:WritableSignal<OwlOptions> = signal({
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3500,
    autoplayHoverPause: true,
    margin: 14 ,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 2
      },
      940: {
        items: 3
      },
      1100: {
        items: 5
      }
    },
    nav: false
  })

  // ------------------------------------------------


ngOnInit(): void {
    this.getCategoriesData()
  }

  getCategoriesData():void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categoriesList.set(res.data);
      }
    })
  }
}
