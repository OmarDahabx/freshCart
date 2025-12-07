import { isPlatformBrowser } from '@angular/common';
import { Component, computed, inject, input, InputSignal, PLATFORM_ID, Signal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../../../core/auth/services/auth.service';
import { CartService } from '../../../../../features/cart/services/cart.service';
import { FlowbiteService } from '../../../../../core/services/flowbite/flowbite.service';

@Component({
  selector: 'app-off-canvas',
  imports: [],
  templateUrl: './off-canvas.component.html',
  styleUrl: './off-canvas.component.css'
})
export class OffCanvasComponent {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);  
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);
  count:Signal<number> = computed( ()=> this.cartService.countNummber() )
  isLogin:InputSignal<boolean> = input.required<boolean>()

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  
    if(isPlatformBrowser(this.id)){
    this.getAllCartData();
    }
  }


  getAllCartData():void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.countNummber.set(res.numOfCartItems);
      }
    })
  }

  logOut():void {
    this.authService.signout();
  }
}
