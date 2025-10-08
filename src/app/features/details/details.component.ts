import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdcutDetailsService } from './services/prodcutDetailsService/prodcut-details.service';
import { Iproduct } from '../../core/models/iProducts/iProduct.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly prodcutDetailsService = inject(ProdcutDetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  id:WritableSignal<string | null> = signal(null)
  prodcutDetails:WritableSignal<Iproduct> = signal({ } as Iproduct )

ngOnInit(): void {
  this.getParams();
  this.getProductDetailsData()
}

  addProductInCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res);
        if(res.status === 'success'){
          this.toastrService.success(res.message , 'Fresh Cart');
        }
      }
    })
  }

  getParams():void{
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
        this.id.set(urlParams.get('id')) ;
      },
    })
  }

  getProductDetailsData():void{
    this.prodcutDetailsService.getDetails(this.id()).subscribe({
      next:(res)=>{
          this.prodcutDetails.set(res.data);
      }
    })
  }

  
}