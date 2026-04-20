import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { login } from '../models/login';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private api : Api) {

  }

  forgotpas : boolean = false;
  forgetemail : string = '';

 login(ngform: any) {
  this.api.apipost('auth/login', {
    Email: ngform.value.Email,
    password: ngform.value.password
  }).subscribe((next: any) => {
    console.log(next);
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
      console.log(resp);
    }, (err : any) => console.log(err));
  }
}
