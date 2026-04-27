import { Component, ChangeDetectorRef } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { login } from '../models/login';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private api : Api, private cdr : ChangeDetectorRef, private router : Router) {

  }

  forgotpas : boolean = false;
  forgetemail : string = '';

 login(ngform: any) {
  this.api.apipost('auth/login', {
    Email: ngform.value.Email,
    password: ngform.value.password
  }).subscribe((next: any) => {
    localStorage.setItem('accessToken', next.data.accessToken);
    localStorage.setItem('refreshToken', next.data.refreshToken);
    this.router.navigate(['/home']);
    console.log(next);
    this.cdr.detectChanges();
  }, (err: any) => console.log(err));
}


  fogotpassword() {
    this.forgotpas = true;
    console.log(this.forgotpas);
  }
  passwordsumbit() {
    this.api.apipost(`auth/forgot-password/${this.forgetemail}`, {
      email: this.forgetemail
    }).subscribe((resp : any) => {
      this.forgotpas = false;
      console.log(resp);
    }, (err : any) => console.log(err));
  }
}
