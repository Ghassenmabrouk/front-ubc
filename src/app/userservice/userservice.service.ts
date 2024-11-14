import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../users-list/users-list.component';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private apiUrl = 'http://localhost:3100/api1';
  private userRole: string = ''; // Declare userRole property
  public userLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private cookieService: CookieService) {}


  // Retrieve the token from cookies
  private getAuthToken(): string {
    return this.cookieService.get('token');
  }

  // Setup headers with the token
  private getHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/allusers`, {
      headers: this.getHeaders(),
      withCredentials: true  // Send cookies with the request
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Get a single user by email
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${email}`, {
      headers: this.getHeaders(),
      withCredentials: true  // Send cookies with the request
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Ban a user by email
  banUserByEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/ban/${email}`, {}, {
      headers: this.getHeaders(),
      withCredentials: true  // Send cookies with the request
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Unban a user by email
  unbanUserByEmail(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/unban/${email}`, {}, {
      headers: this.getHeaders(),
      withCredentials: true  // Send cookies with the request
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a user by email
  deleteUser(email: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteuser/${email}`, {
      headers: this.getHeaders(),
      withCredentials: true  // Send cookies with the request
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Edit a user by email
  updateUserByEmail(email: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/edituser/${email}`, user, {
      headers: this.getHeaders(),
      withCredentials: true  // Send cookies with the request
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Set user role
  setUserRole(role: string): void {
    this.userRole = role; // Assign the role
  }

  // Get user role
  getUserRole(): string {
    return this.userRole; // Retrieve the role
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('Unauthorized request - Please check your authentication token.');
    } else if (error.status === 404) {
      console.error('Not Found - Please check the endpoint URL.');
    } else {
      console.error(`An error occurred: ${error.message}`);
    }
    return throwError(() => new Error('An error occurred; please try again later.'));
  }


  getUserInfo(): User | null {
    if (typeof localStorage !== 'undefined') {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo) : null;
    } else {
      console.warn('localStorage is not available');
      return null;
    }
  }
  
  
  clearUserInfo(): void {
    localStorage.removeItem('userInfo');
   
  }

  updateUserProfile(profileData: any) {
    return this.http.post('http://localhost:3100/api5/updateProfile', profileData, { withCredentials: true });
  }

  


  subscribeToPlan(subscriptionData: any): Observable<any> {
    return this.http.post('http://localhost:3100/api6/subscribe', subscriptionData, { withCredentials: true });
  }

}
