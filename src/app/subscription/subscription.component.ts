import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserserviceService } from '../userservice/userservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  subscriptionForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserserviceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.subscriptionForm = this.fb.group({
      plan: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
    });
  }


  
  ngOnInit(): void {}

  onSubmit(): void {
    if (this.subscriptionForm.invalid) {
      return;
    }


    this.loading = true;

    const subscriptionData = this.subscriptionForm.value;

    this.userService.subscribeToPlan(subscriptionData).subscribe(
      (response) => {
        this.snackBar.open('Subscription successful', 'Close', { duration: 3000 });
        this.loading = false;
        this.router.navigate(['/']); // Redirect after successful subscription
      },
      (error) => {
        console.error('Error subscribing to plan', error);
        this.snackBar.open('Failed to subscribe. Please try again.', 'Close', { duration: 3000 });
        this.loading = false;
      }
    );
  }

  selectedPaymentMethod: string = 'paypal';

  selectPaymentMethod(method: string) {
    this.selectedPaymentMethod = method;
  }
}
