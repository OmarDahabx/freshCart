import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../shared/components/input/input.component";
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute =inject(ActivatedRoute);
  private readonly cartService =inject(CartService);

  id:WritableSignal<string | null> = signal(null)
  checkoutForm!:FormGroup;

  ngOnInit(): void {
    this.initCheckoutForm();
    this.getParmId();
  }

  initCheckoutForm():void {
    this.checkoutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details:[null , [Validators.required]],
        phone:[null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city:[null , [Validators.required]]
      })
    })
  }

  getParmId():void {
    this.activatedRoute.paramMap.subscribe({
      next:(urlParams)=>{
      this.id.set(urlParams.get('id'));
      }
    })
  }

  submitCheckOut():void {
    if (this.checkoutForm.valid) {
      this.cartService.checkoutSession(this.id() , this.checkoutForm.value).subscribe({
        next:(res)=>{
          console.log(res);
          if (res.status === 'success') {
            window.open(res.session.url , '_self') 
          }
        }
      })
    }
  }
}