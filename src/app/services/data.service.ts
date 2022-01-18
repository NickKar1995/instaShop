import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Landmark } from '../models/Landmark';
const baseUrl = 'https://frontend-2376.instashop.ae/api/landmarks';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Landmark[]> {
    return this.http.get<Landmark[]>(baseUrl);
  }
}
