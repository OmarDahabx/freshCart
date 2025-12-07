import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { DeToken } from '../../models/deToken/de-token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly router = inject(Router);
  dToken: DeToken | undefined;
  

  signup(data:object): Observable<any> {
  return  this.httpClient.post( environment.baseUrl + 'auth/signup' , data)
  }

  signin(data:object): Observable<any> {
  return this.httpClient.post( environment.baseUrl + 'auth/signin' , data)
  }

  signout(){
    this.cookieService.delete('token');
    this.router.navigate(['/login'])
  }

  decodeToken(): DeToken | undefined {
    

    try {
      this.dToken = jwtDecode<DeToken>(this.cookieService.get('token'))
    } catch (error) {
      this.signout();
    }
    
    return this.dToken;
  }
  

  submitVerfiyEmail(data:object):Observable<any> {
    return this.httpClient.post(environment.baseUrl + 'auth/forgotPasswords' , data )
  }

  submitVerfiyCode(data:object):Observable<any> {
    return this.httpClient.post( environment.baseUrl + 'auth/verifyResetCode' , data )
  }

  submitResetCode(data:object):Observable<any> {
    return this.httpClient.put(environment.baseUrl + 'auth/resetPassword' , data )
  }

}
