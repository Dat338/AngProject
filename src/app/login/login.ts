import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  username : string = '';
  password : string = '';
  forgetemail : string = '';

  login() {
    this.api.apipost('auth/login', {
      email: this.username,
      password: this.password
    }).subscribe((resp : any) => {
      console.log(resp);
    }, (err : any) => console.log(err));
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
