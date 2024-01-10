import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lecturer, SearchLecturer } from '../interface/lecturer';
import { ApiResponse } from '../interface/common';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  constructor(private http: HttpClient) { }

  findAllLecturers(searchData: SearchLecturer): Observable<ApiResponse<Lecturer[]>> {
    const params = new HttpParams()
      .set('path', 'lecturers')
      .set('career', searchData.career)
      .set('nickname', searchData.nickname)
      .set('productType', searchData.productType)
      
    return this.http.get<ApiResponse<Lecturer[]>>(environment.apiUrl, { params });
  }

  findLecturer(id: string): Observable<ApiResponse<Lecturer>> {
    const params = new HttpParams()
      .set('path', 'lecturer')
      .set('id', id)
      
    return this.http.get<ApiResponse<Lecturer>>(environment.apiUrl, { params });
  }

  updateLecturer(lecturer :Lecturer): Observable<ApiResponse<Lecturer>> {
    const params = new HttpParams()
      .set('path', 'update/lecturer')
      .set('id', lecturer.id)
      .set('remark', lecturer.remark)
      .set('performance', lecturer.performance)
      .set('grade', lecturer.grade)

    console.log(params)

    return this.http.get<ApiResponse<Lecturer>>(environment.apiUrl, { params });
  }
}
