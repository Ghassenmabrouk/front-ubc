import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup; 

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize contactForm in the constructor
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.contactForm.valid) {
      this.http.post('http://localhost:3100/api4/contact', this.contactForm.value)
        .subscribe(response => {
          console.log('Contact form submitted', response);
        }, error => {
          console.error('Error submitting contact form', error);
        });
    }
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.contactForm.get('recaptcha')?.setValue(captchaResponse);
  }
}
