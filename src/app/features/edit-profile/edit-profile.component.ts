import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../../userservice/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{7,}$/)]],
      gender: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.minLength(6)]],
      confirmNewPassword: ['']
    }, { validator: this.checkPasswords });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    if (userInfo) {
      this.profileForm.patchValue({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        username: userInfo.username,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        gender: userInfo.gender
      });
    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmNewPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    console.log('Submitting form');
    if (this.profileForm.invalid) {
      console.log('Form is invalid:', this.profileForm.errors);
      return;
    }

    this.loading = true;

    const formData = this.profileForm.value;
    console.log('Form Data:', formData);

    this.userService.updateUserProfile(formData).subscribe(
      (response: any) => {
        console.log('Profile updated successfully:', response);
        this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
        localStorage.setItem('userInfo', JSON.stringify(response.userInfo)); // Update local storage
        this.loading = false;
        this.router.navigate(['/']); // Navigate to home or another page after update
      },
      (error: any) => {
        console.error('Error updating profile', error);
        this.snackBar.open('Failed to update profile. Please try again.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
