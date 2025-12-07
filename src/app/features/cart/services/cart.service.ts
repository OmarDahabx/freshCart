import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { DeToken } from '../../../core/models/deToken/de-token.interface';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly httpClient = inject(HttpClient);
  private readonly cookieService = inject(CookieService);
  private readonly authService = inject(AuthService);

  countNummber:WritableSignal<number> = signal(0);



  addProductToCart(id:string):Observable<any>{
  return  this.httpClient.post(environment.baseUrl + 'cart' , 
    {
      productId:id
    },
  
  )
  }

  getLoggedUserCart():Observable<any> {
  return  this.httpClient.get(environment.baseUrl + 'cart' , )
  }

  removeSpecificCartItem(id:string):Observable<any> {
  return  this.httpClient.delete(environment.baseUrl + `cart/${id}` , )
  } 

  updateCartProductQuantity(id:string , countN:number):Observable<any> {
    return this.httpClient.put( environment.baseUrl + `cart/${id}` , 
      {
        count: countN
      }
      , )
  }

  checkoutSession(id:string | null , data:object ):Observable<any>{
    return this.httpClient.post( environment.baseUrl + `orders/checkout-session/${id}?url=http://localhost:4200` , data , ) 
  }

  getAllUserOrders():Observable<any> {
    const decodedo: DeToken | undefined = this.authService.decodeToken();
    return this.httpClient.get(environment.baseUrl + `orders/user/${decodedo?.id}`)
}



}
