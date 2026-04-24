import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike, CreateBike } from './models/bike.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  constructor(private http: HttpClient) { }

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${environment.apiUrl}/api/bikes`);
  }

  getBikeByReference(reference: string): Observable<Bike> {
    return this.http.get<Bike>(`${environment.apiUrl}/api/bikes/${reference}`);
  }

  createBike(bike: CreateBike): Observable<Bike> {
    return this.http.post<Bike>(`${environment.apiUrl}/api/bikes`, bike);
  }
}
