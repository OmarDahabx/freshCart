import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpecificCategoryService {
  private readonly httpClient = inject(HttpClient);


  
  getSpecificCategory(id: string | null):Observable<any> {
    return  this.httpClient.get( environment.baseUrl + `categories/${id}` )
  }
}
