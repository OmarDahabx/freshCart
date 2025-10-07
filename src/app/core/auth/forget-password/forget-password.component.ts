import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from "../../../shared/components/input/input.component";
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);

  verifyEmail!:FormGroup;
  verifyCode!:FormGroup;
  restPassword!:FormGroup;

  step:WritableSignal<number> = signal(1);

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm():void{
    this.verifyEmail = this.fb.group({
      email:[null , [Validators.required , Validators.email]]
    })

    this.verifyCode = this.fb.group({
      resetCode: [null , [Validators.required]]
    })

    this.restPassword = this.fb.group({
      email:[null , [Validators.required , Validators.email]],
      newPassword: [ null , [Validators.required , Validators.pattern(/^\w{6,}$/)] ]
    })


  }
  
  formStep1():void{
    if(this.verifyEmail.valid){
        this.authService.submitVerfiyEmail(this.verifyEmail.value).subscribe({
            next:(res)=>{
                console.log(res);
                this.step.set(2);
            }
        })
    }
  }

  formStep2():void {
    if (this.verifyCode.valid) {
        this.authService.submitVerfiyCode(this.verifyCode.value).subscribe({
          next: (res)=>{
            console.log(res);
            this.step.set(3)
          }
        })
    }
  }

  formStep3():void{
    if ( this.restPassword.valid ) {
        this.authService.submitResetCode(this.restPassword.value).subscribe({
          next: (res)=>{
            console.log(res)
            this.cookieService.set('token' , res.token);
            this.router.navigate(['/home']);
            
          }
        })
    }
  }
}
