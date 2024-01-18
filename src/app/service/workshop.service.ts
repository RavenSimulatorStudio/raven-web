import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchWorkshop, Workshop } from '../interface/workshop';
import { ApiResponse } from '../interface/common';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkshopService {

  constructor(private http: HttpClient) { }

  findWorkshops(searchData: SearchWorkshop): Observable<ApiResponse<Workshop[]>> {
    const params = new HttpParams()
      .set('path', 'report/workshops')
      .set('workshopName', searchData.workshop)
      .set('workshopStatus', searchData.status)
      
    return this.http.get<ApiResponse<Workshop[]>>(environment.apiUrl, { params });
  }

  saveWorkshopInfo(payload: string): Observable<any> {
    const params = new HttpParams()
      .set('path', 'report/workshops/detail/update')
      .set('payload', payload)
      
    return this.http.get<any>(environment.apiUrl, { params });
  }
}
