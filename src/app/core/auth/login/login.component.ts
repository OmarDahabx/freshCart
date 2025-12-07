import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from "../../../shared/components/input/input.component";
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { DeToken } from '../../models/deToken/de-token.interface';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

private readonly authService = inject(AuthService);
  private readonly router =inject(Router);
  private readonly fb =inject(FormBuilder);
  private readonly cookieService =inject(CookieService);

  msgError:WritableSignal<string> = signal("");
  isLoading:WritableSignal<boolean> = signal(false);
  flag:WritableSignal<boolean> = signal(true);

  loginForm !:FormGroup ;
  subscription:Subscription = new Subscription();
  
  ngOnInit(): void {
    this.initLoginForm()
  }
  initLoginForm():void {
    this.loginForm = this.fb.group({
      email : [ null , [Validators.required , Validators.email ]],
      password : [ null , [Validators.required , Validators.pattern(/^\w{6,}$/)] ],
    })
  }
    

  submitForm():void {

    if( this.loginForm.valid ){
      this.subscription.unsubscribe()
          this.isLoading.set(true);
          this.subscription = this.authService.signin(this.loginForm.value).subscribe({
            next:(res)=>{
              this.isLoading.set(false);
              
              if(res.message === 'success'){
                // this.msgError = '';
                setTimeout(()=>{
                  this.cookieService.set('token' , res.token )

                  const decoded = this.authService.decodeToken();

                  if (decoded) {
                    this.authService.dToken = decoded;
                  }
                  this.router.navigate(['/home'])
                } , 1000)
              
            }
            },
            error:(err)=>{
              this.isLoading.set(false)
              this.msgError.set(err.error.message)
            }
          })
    }
  }

}
