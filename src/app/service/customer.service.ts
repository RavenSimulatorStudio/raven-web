import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApproveStatus, UpdateRemarks, Customer, SearchCustomer } from '../interface/customer';
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

  updateStatus(approveStatus: ApproveStatus): Observable<ApiResponse<ApproveStatus>> {
    const params = new HttpParams()
      .set('path', 'update/status')
      .set('id', approveStatus.id)
      .set('approval', approveStatus.approval)
      .set('status', approveStatus.status);

    return this.http.get<ApiResponse<ApproveStatus>>(environment.apiUrl, { params });
  }

  findCustomer(id: string): Observable<ApiResponse<Customer>> {
    const params = new HttpParams()
      .set('path', 'customer')
      .set('id', id)
      
    return this.http.get<ApiResponse<Customer>>(environment.apiUrl, { params });
  }
  
  updateRemarks(updateRemarks :UpdateRemarks): Observable<ApiResponse<UpdateRemarks>> {
    const params = new HttpParams()
      .set('path', 'update/remarks')
      .set('id', updateRemarks.id)
      .set('remark', updateRemarks.remark)

    return this.http.get<ApiResponse<UpdateRemarks>>(environment.apiUrl, { params });
  }
}
