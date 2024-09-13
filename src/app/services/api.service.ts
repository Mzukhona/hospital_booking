import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  static getApiUrl(): string {
    return ApiService.apiUrl;  // Use ApiService to access static property
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(`${ApiService.apiUrl}/${endpoint}`);  // Use ApiService to access static property
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(`${ApiService.apiUrl}/${endpoint}`, body);
  }

  put(endpoint: string, body: any): Observable<any> {
    return this.http.put(`${ApiService.apiUrl}/${endpoint}`, body);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(`${ApiService.apiUrl}/${endpoint}`);
  }
}
