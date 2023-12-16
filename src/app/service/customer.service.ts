import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer, SearchCustomer } from '../interface/customer';
import { Observable, of } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  findAllCustomers(searchData: SearchCustomer): Observable<Customer[]> {
    const params = new HttpParams()
      .set('path', 'customers')
      .set('workshopName', searchData.workshop)
      .set('nickname', searchData.nickname);
      
    return this.http.get<Customer[]>(environment.apiUrl, { params });
  }
}
