import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  
  getWorkshops(): Observable<string[]> {
    return this.http.get<string[]>(environment.apiUrl + '?path=workshops');
  }
}
