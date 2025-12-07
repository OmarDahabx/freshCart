import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../cart/services/cart.service';
import { FlowbiteService } from '../../core/services/flowbite/flowbite.service';
import { initFlowbite } from 'flowbite';
import { CartItem, OrdersData } from './models/orders-data.interface';
import { DatePipe, UpperCasePipe } from '@angular/common';


@Component({
  selector: 'app-allorders',
  imports: [DatePipe ],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent implements OnInit {

private readonly authService = inject(AuthService);
private readonly cartService = inject(CartService);

allOrders:WritableSignal<OrdersData[]> = signal([])
cartItems:WritableSignal<OrdersData> = signal({} as OrdersData)

constructor(private flowbiteService: FlowbiteService) {}

ngOnInit(): void {
  this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  this.getAllUserOrdersData();
}


getAllUserOrdersData():void {
  this.cartService.getAllUserOrders().subscribe({
    next: (res)=>{
        console.log(res);
        this.allOrders.set(res);
    }
  })
}

}
