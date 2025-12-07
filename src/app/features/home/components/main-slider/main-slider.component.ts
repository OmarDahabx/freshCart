import { Component, signal, WritableSignal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule ],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css'
})
export class MainSliderComponent {

  mainSliderOptions:WritableSignal <OwlOptions> = signal({
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000 ,
    autoplayHoverPause: true , 
    navText: [' ',' '],
    navSpeed: 400,
    items : 1,
    nav: false
  })
}
