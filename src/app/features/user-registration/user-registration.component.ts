import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  user = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    gender: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private http: HttpClient, 
    private router: Router,
    private translate: TranslateService // Inject TranslateService
  ) { }

  onSubmit(): void {
    if (this.user.password !== this.user.confirmPassword) {
      Swal.fire({
        title: this.translate.instant('REGISTER.REGISTRATION_FAILED_TITLE'),
        text: this.translate.instant('REGISTER.PASSWORD_MISMATCH_MESSAGE'),
        icon: 'error',
        confirmButtonText: this.translate.instant('REGISTER.CONFIRM_BUTTON')
      });
      return;
    }

    this.http.post('https://ubc-back.onrender.com/register', this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
        Swal.fire({
          title: this.translate.instant('REGISTER.REGISTRATION_SUCCESS_TITLE'),
          text: this.translate.instant('REGISTER.EMAIL_CONFIRMATION_MESSAGE'),
          icon: 'success',
          confirmButtonText: this.translate.instant('REGISTER.CONFIRM_BUTTON')
        });
      },
      error: (error) => {
        console.error('Registration failed', error);
        Swal.fire({
          title: this.translate.instant('REGISTER.REGISTRATION_FAILED_TITLE'),
          text: this.translate.instant('REGISTER.RETRY_MESSAGE'),
          icon: 'error',
          confirmButtonText: this.translate.instant('REGISTER.CONFIRM_BUTTON')
        });
      }
    });
  }
}
