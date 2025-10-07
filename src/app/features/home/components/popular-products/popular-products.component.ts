import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { ProductsService } from '../../../../core/services/Products/products.service';
import { Iproduct } from '../../../../core/models/iProducts/iProduct.interface';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit {

  private readonly productsService = inject(ProductsService);
  productList:WritableSignal<Iproduct[]> = signal([]);

  ngOnInit(): void {
    this.getProductsData()
  }

  getProductsData():void{
    this.productsService.getAllProducts().subscribe({
      next: (res)=>{
          this.productList.set(res.data);
      }
    })
  }

}
