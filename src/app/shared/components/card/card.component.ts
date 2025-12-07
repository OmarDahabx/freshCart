import { Component, inject, input, Input, InputSignal, signal } from '@angular/core';
import { Iproduct } from '../../../core/models/iProducts/iProduct.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  product:InputSignal<Iproduct> = input.required<Iproduct>()

  addProductInCart(id:string):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        if(res.status === 'success'){
          this.cartService.countNummber.set(res.numOfCartItems)
          this.toastrService.success(res.message , 'Fresh Cart');
        }
      }
    })
  }

}
