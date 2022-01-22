import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Landmark } from '../models/Landmark';
import { LandmarkById } from '../models/LandmarkById';
import { UpdatedLandmark } from '../models/UpdatedLandmark';

const baseUrl = 'https://frontend-2376.instashop.ae/api/landmarks';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Landmark[]> {
    return this.http.get<Landmark[]>(baseUrl);
  }
  getById(id: string): Observable<LandmarkById> {
    return this.http.get<LandmarkById>(`${baseUrl}/${id}`);
  }

  update(id: string, data: UpdatedLandmark): Observable<UpdatedLandmark> {
    console.log('STUFF FROM SERVICE', id, data);
    const token = window.localStorage.getItem('token');

    return this.http.put<UpdatedLandmark>(`${baseUrl}/${id}`, data, {
      headers: new HttpHeaders({
        'x-sessiontoken': token!,
      }),
    });
  }
}
