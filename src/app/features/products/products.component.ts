import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CardComponent } from "../../shared/components/card/card.component";
import { Iproduct } from '../../core/models/iProducts/iProduct.interface';
import { ProductsService } from '../../core/services/Products/products.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  imports: [CardComponent , NgxPaginationModule  , SearchPipe , FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
 private readonly productsService = inject(ProductsService);
 private readonly ngxSpinnerService = inject(NgxSpinnerService);

  productList:WritableSignal<Iproduct[]> = signal([]);
  pageSize:WritableSignal<number> = signal(0)
  p:WritableSignal<number> = signal(1)
  total:WritableSignal<number> = signal(0)
  searchText:WritableSignal<string> = signal("")

  ngOnInit(): void {
    this.getProductsData()
  }

  getProductsData(pageNumber : number = 1):void{
    this.ngxSpinnerService.show();
    this.productsService.getAllProducts(pageNumber).subscribe({
      next: (res)=>{
          this.productList.set(res.data);
          this.pageSize.set(res.metadata.limit);
          this.p.set(res.metadata.currentPage);
          this.total.set(res.results);
          this.ngxSpinnerService.hide();
      }
    })
  }

}
