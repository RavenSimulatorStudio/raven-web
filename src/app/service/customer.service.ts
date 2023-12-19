import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApproveStatus, ApprovedStatus, Customer, SearchCustomer } from '../interface/customer';
import { Observable, of } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  findAllCustomers(searchData: SearchCustomer): Observable<ApiResponse<Customer[]>> {
    const params = new HttpParams()
      .set('path', 'customers')
      .set('workshopName', searchData.workshop)
      .set('nickname', searchData.nickname)
      .set('status', searchData.status);
      
    return this.http.get<ApiResponse<Customer[]>>(environment.apiUrl, { params });
  }

  updateStatus(approveStatus: ApproveStatus): Observable<ApiResponse<ApprovedStatus>> {
    const params = new HttpParams()
      .set('path', 'update/status')
      .set('id', approveStatus.id)
      .set('approval', approveStatus.approval)
      .set('status', approveStatus.status);

    return this.http.get<ApiResponse<ApprovedStatus>>(environment.apiUrl, { params });
  }
}
