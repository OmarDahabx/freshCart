import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.interface';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);

  cartDetails:WritableSignal<Cart> = signal({} as Cart )

ngOnInit(): void {
  this.getLoggedUserData()
}

  getLoggedUserData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartDetails.set(res.data);
      }
    })
  }

  removeSpecificItem(id:string):void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res)=>{
        this.cartDetails.set(res.data);
        this.cartService.countNummber.set(res.numOfCartItems)
      },
    })
  }

  updateCount( id:string , countN:number ):void {
    this.cartService.updateCartProductQuantity(id , countN).subscribe({
      next: (res)=>{
        this.cartDetails.set(res.data);
      }
    })
  }
}
