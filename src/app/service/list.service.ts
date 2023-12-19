import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { ApiResponse, WorkshopsList } from '../interface/common';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  
  getWorkshops(): Observable<ApiResponse<WorkshopsList>> {
    return this.http.get<ApiResponse<WorkshopsList>>(environment.apiUrl + '?path=workshops');
  }
}
