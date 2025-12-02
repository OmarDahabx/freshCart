import { Component, computed, inject, input, Input, InputSignal, OnInit, PLATFORM_ID, signal, Signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { OffCanvasComponent } from "./off-canvas/off-canvas/off-canvas.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, OffCanvasComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  
  constructor(private flowbiteService: FlowbiteService) {}

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
