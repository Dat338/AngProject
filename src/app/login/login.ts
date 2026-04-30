import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { login } from '../models/login';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(private api : Api, private cdr : ChangeDetectorRef, private router : Router) {

  }
  snackbar = inject(MatSnackBar)


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
  }, (err: any) => {
    console.log(err),
    this.snackbar.open(`Email or password is wrong!`, `close`, {
      duration: 2000,
      panelClass: ['error-snackbar']
    } )
  });
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
