import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse, WorkshopsList, WorkshopsListSearch } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  
  getWorkshops(workshopsListSearch?: WorkshopsListSearch): Observable<ApiResponse<WorkshopsList>> {
    const params = new HttpParams()
      .set('path', 'workshops')
      .set('workshopStatus', workshopsListSearch?.workshop_status || '')
      .set('certificateFlag', workshopsListSearch?.certificate_flag || '')
      
    return this.http.get<ApiResponse<WorkshopsList>>(environment.apiUrl, { params });
  }
}
