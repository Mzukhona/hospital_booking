import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';

export interface User {
  id: number;
  password: string;
  role: string;
  username: string;
}
export interface AuthResponse {
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'users';
  private authEndpoint = 'auth';

  constructor(private apiService: ApiService) {}

  // Method to get a list of users
  getUsers(): Observable<User[]> {
    return this.apiService.get(this.endpoint).pipe(
      catchError(error => {
        console.error('Error fetching users', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }
  register(userData: User): Observable<User> {
    return this.apiService.post(`${this.authEndpoint}/register`, userData).pipe(
      catchError(error => {
        console.error('Error registering user', error);
        return of(); // Return null or handle as needed
      })
    );
  }
  // Method to get a user by ID
  getUserById(id: number): Observable<User> {
    return this.apiService.get(`${this.endpoint}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching user with ID ${id}`, error);
        return of();
      })
    );
  }
  
  // Method to update a user
  updateUser(id: number, userData: Partial<User>): Observable<User> {
    return this.apiService.put(`${this.endpoint}/${id}`, userData).pipe(
      catchError(error => {
        console.error(`Error updating user with ID ${id}`, error);
        return of();
      })
    );
  }

  // Method to delete a user
  deleteUser(id: number): Observable<void> {
    return this.apiService.delete(`${this.endpoint}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting user with ID ${id}`, error);
        return of(); // Return void in case of error
      })
    );
  }


}
