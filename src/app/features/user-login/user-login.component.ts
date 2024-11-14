import { Component, NgZone, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserserviceService } from '../../userservice/userservice.service';

interface LoginResponse {
  message: string;
  userInfo?: {
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
}

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  user = { email: '', password: '' };
  showPassword: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar,
    private ngZone: NgZone,
    private userService: UserserviceService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    const data = {
      email: this.user.email,
      password: this.user.password
    };

    this.http.post<LoginResponse>('https://ubc-back.onrender.com/login/login', data, { withCredentials: true })
      .subscribe({
        next: (response) => {
          console.log('Login successful', response);
          const userInfo = response.userInfo;
          if (userInfo) {
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            this.userService.setUserRole(userInfo.role);
            this.userService.userLoggedIn.next(true); // Notify about successful login
            this.cdr.detectChanges(); // Trigger change detection

            this.requestNotificationPermission();
            this.ngZone.run(() => {
              if (userInfo.role === 'user') {
                this.router.navigate(['/']);
              }
              if (userInfo.role === 'admin') {
                this.router.navigate(['/userslist']);
              }
            });
          } else {
            console.error('Login response does not include userInfo');
            this.snackBar.open('Unexpected error occurred. Please try again.', 'Close', { duration: 10000 });
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          let message = 'Login failed. Please try again later.';
          if (error.status === 403) {
            message = 'Please confirm your email before logging in.';
          } else if (error.status === 405) {
            message = 'You are banned. Please contact support.';
          }
          this.snackBar.open(message, 'Close', { duration: 10000 });
        },
      });
  }

  requestReset(): void {
    this.http.post('https://ubc-back.onrender.com/resetpassword', { email: this.user.email }, { withCredentials: true })
      .subscribe({
        next: (response: any) => {
          console.log('Reset email sent.', response);
          this.snackBar.open('Password reset email sent. Please check your inbox.', 'Close', { duration: 10000 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Reset request failed', error);
          this.snackBar.open('Failed to send password reset email. Please try again later.', 'Close', { duration: 100000 });
        }
      });
  }

  requestNotificationPermission(): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        console.log('Notification permission already granted.');
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
          }
        });
      }
    } else {
      console.log('This browser does not support notifications.');
    }
  }

  showNotification(title: string, options: NotificationOptions): void {
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    }
  }
}
