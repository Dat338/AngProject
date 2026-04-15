import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(private postapi : Api) {

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
    }, (err : any) => console.log(err));
    this.postapi.apipost(`auth/resend-email-verification/${this.email}`, {}).subscribe((resp : any) => {
      console.log(resp);
    }, (err : any) => {
      console.log(err);
    });
    this.display = true;
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
    }, (err : any) => {
      console.log(err);
    });
  }

}
