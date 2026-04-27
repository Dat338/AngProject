import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(private postapi : Api, private cdr : ChangeDetectorRef, private router : Router) {

  }
  ngOnInit() {

  }

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  code = '';
  display = false;

  register() {
    this.postapi.apipost('auth/register', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password
    }).subscribe((resp : any) => {
      console.log(resp);
      if (resp.data) {
        this.display = true;
        this.cdr.detectChanges();
      }
    }, (err : any) => console.log(err));
    if (this.display) {
    this.postapi.apipost(`auth/resend-email-verification/${this.email}`, {}).subscribe((resp : any) => {
      console.log(resp);
    }, (err : any) => {
      console.log(err);
    });
  }
  }
    
    resend() {    this.postapi.apipost(`auth/resend-email-verification/${this.email}`, {}).subscribe((resp : any) => {
      console.log(resp);
    }, (err : any) => {
      console.log(err);
    });
  }
  verification() {
    this.postapi.apiput(`auth/verify-email`, {
      email: this.email,
      code: this.code
    })
    .subscribe((resp : any) => {
      console.log(resp);
      this.router.navigate(['/login']);
    }, (err : any) => {
      console.log(err);
    });
    }


}
